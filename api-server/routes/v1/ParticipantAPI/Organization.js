const router = require('express').Router()
const moment = require('moment')

const invoke = require('../../../app/invoke')
const { validate, OrganizationValidations } = require('../../../utils/Validators')
const { CHAINCODE_ACTIONS, USER_ROLES } = require('../../../utils/helper')
const { OrganizationModel, UserModel } = require('../../../models')
const { HandleResponseError, RequestInputError } = require('../../../utils/HandleResponseError')
const { registerUser } = require('../../../app/registerUser')

let Organizationschema = [
    { "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false },
    { "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "Participant_id", "isEncrypt": false },
    { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false },
    { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false },
    { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false },
    { "name": "BusinessEmail", "required": true, "in": "body", "type": "string", "description": "BusinessEmail", "isEncrypt": false },
    { "name": "LicenseKey", "required": true, "in": "body", "type": "string", "description": "LicenseKey", "isEncrypt": false },
    { "name": "FirstName", "required": true, "in": "body", "type": "string", "description": "FirstName", "isEncrypt": false },
    { "name": "SurName", "required": true, "in": "body", "type": "string", "description": "SurName", "isEncrypt": false },
    { "name": "PhoneNumber", "required": true, "in": "body", "type": "string", "description": "PhoneNumber", "isEncrypt": false },
    { "name": "CompanyName", "required": true, "in": "body", "type": "string", "description": "CompanyName", "isEncrypt": false },
    { "name": "CompanySize", "required": true, "in": "body", "type": "string", "description": "CompanySize", "isEncrypt": false },
    { "name": "Country", "required": true, "in": "body", "type": "string", "description": "Country", "isEncrypt": false },
    { "name": "State", "required": true, "in": "body", "type": "string", "description": "State", "isEncrypt": false },
    { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }
]

router.post('/create', validate(OrganizationValidations), async (req, res) => {
    try {
        const { FirstName, SurName, PhoneNumber, BusinessEmail, CompanyName, CompanySize, Country, State, LicenseKey } = req.body;

        // chekcing for license key
        if (!(["ABC", "XYZ"].some(key => key == LicenseKey))) {
            throw new RequestInputError({ code: 400, message: "Invalid license key" })
        }
        // 0. check uniqueness of organization and user
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
        const userData = {
            firstName: FirstName,
            lastName: SurName,
            businessEmail: BusinessEmail,
            phoneNumber: PhoneNumber,
            role: USER_ROLES.ADMIN,
            organization: organizationResult._id
        }

        let userResult = await UserModel.create(userData)

        // 3. register user in wallet
        await registerUser({ OrgMSP: CompanyName, userId: FirstName+" "+SurName })
 
        // 3. generate and send password via email

        // 4. save the obj to blockchain
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
            metaInfo: { userName: FirstName+" "+SurName, org: CompanyName }, 
            organizationName: CompanyName,
            channelName: 'drlchannel',
            chainCodeName: 'Organization',
            chainCodeFunctionName: 'create',
            data,
            schema: Organizationschema,
            chainCodeAction: CHAINCODE_ACTIONS.CREATE
        });

        console.log({ message })

        // if (message && message.status == true) {
        //     res.send(message);
        // }
        // else {
        //     res.send(message);
        // }
        res.status(201).json({...organizationResult._doc, user: { ...userResult._doc }})
    }catch(err) {
        HandleResponseError(err, res);
    }
});

module.exports = router;