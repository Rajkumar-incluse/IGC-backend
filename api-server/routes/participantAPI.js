var express = require('../node_modules/express');
var router = express.Router();
var jwt = require('../node_modules/jsonwebtoken');
var log4js = require('../node_modules/log4js/lib/log4js');
var logger = log4js.getLogger('licblockytRestApi');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', 'network_config.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const cp = JSON.parse(ccpJSON);
var invoke = require('../app/invoke.js');
var querytranns = require('../app/query.js');
var ObjectID = require('mongodb').ObjectID;
var register = require('../app/registerUser.js');
const passport = require('passport');
const moment = require('moment');

var IGCAdminschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "Participant_id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "Walletid", "required": true, "in": "body", "type": "string", "description": "Walletid", "isEncrypt": false }, { "name": "Username", "required": true, "in": "body", "type": "string", "description": "Username", "isEncrypt": false }, { "name": "Password", "required": true, "in": "body", "type": "string", "description": "Password", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/participantapi/IGCAdmin/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'IGCAdmin', 'create', req, IGCAdminschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/participantapi/IGCAdmin/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'IGCAdmin', 'get', req, IGCAdminschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/participantapi/IGCAdmin/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'IGCAdmin', 'update', req, IGCAdminschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.delete('/participantapi/IGCAdmin/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'IGCAdmin', 'delete', req, IGCAdminschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.get('/participantapi/IGCAdmin/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'IGCAdmin', 'history', req, IGCAdminschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/participantapi/IGCAdmin/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'IGCAdmin', 'querystring', req, IGCAdminschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var enrollschema = [{ "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "The ID for the participant.\n" }, { "name": "PIN", "required": true, "in": "body", "type": "string", "description": "The MPIN for the participant.\n" }]


router.post('/participantapi/IGCAdmin/enroll', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await register.registerUserParticipant(cp, 'undefinedMSP', 'undefined', 'department1', 'undefined', 'wallet', req, enrollschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var Licenseschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "Participant_id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "LicenseId", "required": true, "in": "body", "type": "string", "description": "LicenseId", "isEncrypt": false }, { "name": "LicenseKey", "required": true, "in": "body", "type": "string", "description": "LicenseKey", "isEncrypt": false }, { "name": "OrganisationName", "required": true, "in": "body", "type": "string", "description": "OrganisationName", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/participantapi/License/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'License', 'create', req, Licenseschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/participantapi/License/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'License', 'get', req, Licenseschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/participantapi/License/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'License', 'update', req, Licenseschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.delete('/participantapi/License/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'License', 'delete', req, Licenseschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.get('/participantapi/License/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'License', 'history', req, Licenseschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/participantapi/License/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'License', 'querystring', req, Licenseschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var enrollschema = [{ "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "The ID for the participant.\n" }, { "name": "PIN", "required": true, "in": "body", "type": "string", "description": "The MPIN for the participant.\n" }]


router.post('/participantapi/License/enroll', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await register.registerUserParticipant(cp, 'undefinedMSP', 'undefined', 'department1', 'undefined', 'wallet', req, enrollschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var Organizationschema = [
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


router.post('/participantapi/Organization/create', async (req, res) => {
    let { FirstName, SurName, PhoneNumber, BusinessEmail, CompanyName, CompanySize, Country, State, LicenseKey  } = req.body;

    let obj = {
        body:{
            FirstName, SurName, PhoneNumber, BusinessEmail, CompanyName, CompanySize, Country, State, LicenseKey,
            "Id": "",
            "PArticipant_id": "",

        }
    }


    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Organization', 'create', req, Organizationschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/participantapi/Organization/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Organization', 'get', req, Organizationschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/participantapi/Organization/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Organization', 'update', req, Organizationschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.delete('/participantapi/Organization/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Organization', 'delete', req, Organizationschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.get('/participantapi/Organization/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Organization', 'history', req, Organizationschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/participantapi/Organization/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Organization', 'querystring', req, Organizationschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var enrollschema = [{ "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "The ID for the participant.\n" }, { "name": "PIN", "required": true, "in": "body", "type": "string", "description": "The MPIN for the participant.\n" }]


router.post('/participantapi/Organization/enroll', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await register.registerUserParticipant(cp, 'undefinedMSP', 'undefined', 'department1', 'undefined', 'wallet', req, enrollschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var OrgAdminschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "Participant_id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "OrganizationId", "required": true, "in": "body", "type": "string", "description": "OrganizationId", "isEncrypt": false }, { "name": "BusinessEmail", "required": true, "in": "body", "type": "string", "description": "BusinessEmail", "isEncrypt": false }, { "name": "Walletid", "required": true, "in": "body", "type": "string", "description": "Walletid", "isEncrypt": false }, { "name": "Password", "required": true, "in": "body", "type": "string", "description": "Password", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/participantapi/OrgAdmin/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'OrgAdmin', 'create', req, OrgAdminschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/participantapi/OrgAdmin/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'OrgAdmin', 'get', req, OrgAdminschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/participantapi/OrgAdmin/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'OrgAdmin', 'update', req, OrgAdminschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.delete('/participantapi/OrgAdmin/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'OrgAdmin', 'delete', req, OrgAdminschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.get('/participantapi/OrgAdmin/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'OrgAdmin', 'history', req, OrgAdminschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/participantapi/OrgAdmin/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'OrgAdmin', 'querystring', req, OrgAdminschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var enrollschema = [{ "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "The ID for the participant.\n" }, { "name": "PIN", "required": true, "in": "body", "type": "string", "description": "The MPIN for the participant.\n" }]


router.post('/participantapi/OrgAdmin/enroll', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await register.registerUserParticipant(cp, 'undefinedMSP', 'undefined', 'department1', 'undefined', 'wallet', req, enrollschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var Usersschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "Participant_id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "Email", "required": true, "in": "body", "type": "string", "description": "Email", "isEncrypt": false }, { "name": "Password", "required": true, "in": "body", "type": "string", "description": "Password", "isEncrypt": false }, { "name": "Role", "required": true, "in": "body", "type": "string", "description": "Role", "isEncrypt": false }, { "name": "Status", "required": true, "in": "body", "type": "string", "description": "Status", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/participantapi/Users/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Users', 'create', req, Usersschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/participantapi/Users/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Users', 'get', req, Usersschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/participantapi/Users/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Users', 'update', req, Usersschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.delete('/participantapi/Users/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Users', 'delete', req, Usersschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.get('/participantapi/Users/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Users', 'history', req, Usersschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/participantapi/Users/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Users', 'querystring', req, Usersschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var enrollschema = [{ "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "The ID for the participant.\n" }, { "name": "PIN", "required": true, "in": "body", "type": "string", "description": "The MPIN for the participant.\n" }]


router.post('/participantapi/Users/enroll', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await register.registerUserParticipant(cp, 'undefinedMSP', 'undefined', 'department1', 'undefined', 'wallet', req, enrollschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var Userprofileschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "Participant_id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "UserId", "required": true, "in": "body", "type": "string", "description": "UserId", "isEncrypt": false }, { "name": "FirstName", "required": true, "in": "body", "type": "string", "description": "FirstName", "isEncrypt": false }, { "name": "LastName", "required": true, "in": "body", "type": "string", "description": "LastName", "isEncrypt": false }, { "name": "Email", "required": true, "in": "body", "type": "string", "description": "Email", "isEncrypt": false }, { "name": "PhoneNumber", "required": true, "in": "body", "type": "string", "description": "PhoneNumber", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/participantapi/Userprofile/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Userprofile', 'create', req, Userprofileschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/participantapi/Userprofile/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Userprofile', 'get', req, Userprofileschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/participantapi/Userprofile/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Userprofile', 'update', req, Userprofileschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.delete('/participantapi/Userprofile/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Userprofile', 'delete', req, Userprofileschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.get('/participantapi/Userprofile/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Userprofile', 'history', req, Userprofileschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/participantapi/Userprofile/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'Userprofile', 'querystring', req, Userprofileschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var enrollschema = [{ "name": "Participant_id", "required": true, "in": "body", "type": "string", "description": "The ID for the participant.\n" }, { "name": "PIN", "required": true, "in": "body", "type": "string", "description": "The MPIN for the participant.\n" }]


router.post('/participantapi/Userprofile/enroll', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await register.registerUserParticipant(cp, 'undefinedMSP', 'undefined', 'department1', 'undefined', 'wallet', req, enrollschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
module.exports = router;