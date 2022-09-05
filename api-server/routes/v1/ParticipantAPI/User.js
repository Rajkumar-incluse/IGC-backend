const router = require('express').Router()
const moment = require('moment')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const invoke = require('../../../app/invoke')
const { validate, OrganizationValidations } = require('../../../utils/Validators')
const { CHAINCODE_ACTIONS, USER_ROLES, USER_STATUS } = require('../../../utils/helper')
const { OrganizationModel, UserModel } = require('../../../models')
const { HandleResponseError, RequestInputError, ObjectExistsError } = require('../../../utils/HandleResponseError')
const { registerUser } = require('../../../app/registerUser')
const { sendMail } = require('../../../utils/Mailer')
const { SEND_PASSWORD_TEMPLATE } = require('../../../utils/Mailer').EMAIL_TEMPLATES

var Usersschema = [
    { "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, 
    { "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "Participant_id", "isEncrypt": false }, 
    { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, 
    { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, 
    { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, 
    { "name": "Email", "required": true, "in": "body", "type": "string", "description": "Email", "isEncrypt": false }, 
    { "name": "Password", "required": true, "in": "body", "type": "string", "description": "Password", "isEncrypt": false }, 
    { "name": "Role", "required": true, "in": "body", "type": "string", "description": "Role", "isEncrypt": false }, 
    { "name": "Status", "required": true, "in": "body", "type": "string", "description": "Status", "isEncrypt": false }, 
    { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }
]

router.post('/create', async(req, res)=>{
    try{
        let { firstName, lastName, email, phoneNumber, role } = req.body
        let { userId, msp, orgId } = req.user

        let exists = await UserModel.find({ email: email })

        if(exists.length > 0){
            throw new ObjectExistsError({ message: "User with this email already exists" })
        }
        
        const salt = await bcrypt.genSalt(10)
        let generatedPassword = "pwd_"+email.split("@")[0]
        let hashedpassword = await bcrypt.hash(generatedPassword, salt);
        
        const userData = {
            firstName,
            lastName,
            email,
            password: hashedpassword,
            phoneNumber,
            role,
            status: USER_STATUS.ACTIVE,
            organization: orgId,
            createdBy: userId
        }

        let userResult = await UserModel.create(userData)

        let { subject, text } = SEND_PASSWORD_TEMPLATE({ firstName, password: generatedPassword })
        await sendMail({ toEmails: email, subject, text })

        // registering in wallet
        await registerUser({ OrgMSP: msp, userId: email })
        
        userResult = { ...userResult._doc }

        delete userResult['password']
        
        res.status(200).json(userResult)
    }catch(err){
        HandleResponseError(err, res)
    }
})

router.get('', async(req, res)=>{
    try{
        let { orgId } = req.user;
        let users = await UserModel.find(
            { $and: [
                { 'organization': { $exists: true } }, 
                { 'organization': orgId }
            ], 'status': 'active' })
        res.status(200).json(users)
    }catch(err){
        HandleResponseError(err, res)
    }
})

module.exports = router;