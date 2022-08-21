const router = require('express').Router()
const moment = require('moment')
const path = require('path')
const fs = require('fs')

const invoke = require('../../../app/invoke')
const { validate, OrganizationValidations } = require('../../../utils/Validators')
const ccpPath = path.resolve(__dirname, '..', '..', '..', 'network_config.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const cp = JSON.parse(ccpJSON);

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
    let { FirstName, SurName, PhoneNumber, BusinessEmail, CompanyName, CompanySize, Country, State, LicenseKey } = req.body;

    req.body = {
        FirstName, SurName, PhoneNumber, BusinessEmail, CompanyName, CompanySize, Country, State, LicenseKey,
        "Id": "",
        "Participant_id": "",
        "CreatedOn": moment(new Date()).format(),
        "CreatedBy": "",
        "IsDelete": false,
        "Notes": ""
    }


    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'Organization', 'create', req, Organizationschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});

module.exports = router;