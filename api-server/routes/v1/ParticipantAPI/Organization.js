const router = require('express').Router()
const moment = require('moment')
const bcrypt = require('bcryptjs')

const invoke = require('../../../app/invoke')
const { validate, OrganizationValidations } = require('../../../utils/Validators')
const { CHAINCODE_ACTIONS, USER_ROLES, USER_STATUS, CHAINCODE_NAMES } = require('../../../utils/helper')
const { OrganizationModel, UserModel } = require('../../../models')
const { HandleResponseError, RequestInputError, ObjectExistsError } = require('../../../utils/HandleResponseError')
const { registerUser } = require('../../../app/registerUser')
const { sendMail } = require('../../../utils/Mailer')
const { SEND_PASSWORD_TEMPLATE } = require('../../../utils/Mailer').EMAIL_TEMPLATES

router.post('/create', validate(OrganizationValidations), async (req, res) => {
    try {
        const { FirstName, SurName, PhoneNumber, BusinessEmail, CompanyName, CompanySize, Country, State, LicenseKey } = req.body;

        // chekcing for license key
        if (!(["ABC", "XYZ"].some(key => key == LicenseKey))) {
            throw new RequestInputError({ code: 400, message: "Invalid license key" })
        }

        let exists = await UserModel.find({ businessEmail: BusinessEmail })

        if(exists.length > 0){
            throw new ObjectExistsError({ message: "User with this email already exists" })
        }

        // 1.save to organization collection first
        const orgData = {
            companyName: CompanyName,
            companySize: CompanySize,
            country: Country,
            state: State,
            licenseKey: LicenseKey
        }

        let organizationResult = await OrganizationModel.create(orgData);

        // 2.save to user collection
        const salt = await bcrypt.genSalt(10)
        let generatedPassword = "pwd_"+BusinessEmail.split("@")[0]
        let hashedpassword = await bcrypt.hash(generatedPassword, salt);
        
        const userData = {
            firstName: FirstName,
            lastName: SurName,
            email: BusinessEmail,
            password: hashedpassword,
            phoneNumber: PhoneNumber,
            role: USER_ROLES.ADMIN,
            status: USER_STATUS.ACTIVE,
            organization: organizationResult._id
        }

        let userResult = await UserModel.create(userData)

        // 3. send password via email
        let { subject, text } = SEND_PASSWORD_TEMPLATE({ firstName: FirstName, password: generatedPassword })
        await sendMail({ toEmails: BusinessEmail, subject, text })

        // 4. IMPORTANT - register user in wallet
        await registerUser({ OrgMSP: CompanyName, userId: BusinessEmail })

        // 5. save the obj to blockchain
        const data = {
            FirstName, SurName, PhoneNumber, BusinessEmail, CompanyName, CompanySize, Country, State, LicenseKey,
            "Id": organizationResult._id,
            "Participant_id": "",
            "CreatedOn": moment(new Date()).format(),
            "CreatedBy": "admin",
            "IsDelete": "false",
            "Notes": "some notes"
        }

        let message = await invoke.invokeTransactionV2({
            metaInfo: { userName: BusinessEmail, org: CompanyName }, 
            organizationName: CompanyName,
            channelName: 'drlchannel',
            chainCodeName: CHAINCODE_NAMES.ORGANIZATION,
            chainCodeFunctionName: 'create',
            data,
            chainCodeAction: CHAINCODE_ACTIONS.CREATE
        });

        console.log({ message })

        res.status(201).json({...organizationResult._doc, user: { ...userResult._doc }})
    }catch(err) {
        HandleResponseError(err, res);
    }
});

module.exports = router;