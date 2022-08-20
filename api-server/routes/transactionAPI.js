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
const passport = require('passport');

var activeCCDRschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "DPRNo", "required": true, "in": "body", "type": "string", "description": "DPRNo", "isEncrypt": false }, { "name": "ReferenceSOPnumber", "required": true, "in": "body", "type": "string", "description": "ReferenceSOPnumber", "isEncrypt": false }, { "name": "Department", "required": true, "in": "body", "type": "string", "description": "Department", "isEncrypt": false }, { "name": "PickListNumber", "required": true, "in": "body", "type": "string", "description": "PickListNumber", "isEncrypt": false }, { "name": "Version", "required": true, "in": "body", "type": "string", "description": "Version", "isEncrypt": false }, { "name": "LegacyDocNum", "required": true, "in": "body", "type": "string", "description": "LegacyDocNum", "isEncrypt": false }, { "name": "GeneralInstructions", "required": true, "in": "body", "type": "string", "description": "GeneralInstructions", "isEncrypt": false }, { "name": "ReferenceProcedure", "required": true, "in": "body", "type": "string", "description": "ReferenceProcedure", "isEncrypt": false }, { "name": "ProductPacking", "required": true, "in": "body", "type": "string", "description": "ProductPacking", "isEncrypt": false }, { "name": "CrateShiftingActive", "required": true, "in": "body", "type": "string", "description": "CrateShiftingActive", "isEncrypt": false }, { "name": "SignedBy", "required": true, "in": "body", "type": "string", "description": "SignedBy", "isEncrypt": false }, { "name": "EffectiveDate", "required": true, "in": "body", "type": "string", "description": "EffectiveDate", "isEncrypt": false }, { "name": "Destination", "required": true, "in": "body", "type": "string", "description": "Destination", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/transactionapi/activeCCDR/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'activeCCDR', 'create', req, activeCCDRschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/transactionapi/activeCCDR/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'activeCCDR', 'get', req, activeCCDRschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.delete('/transactionapi/activeCCDR/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'activeCCDR', 'delete', req, activeCCDRschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/transactionapi/activeCCDR/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'activeCCDR', 'update', req, activeCCDRschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/transactionapi/activeCCDR/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'activeCCDR', 'history', req, activeCCDRschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/transactionapi/activeCCDR/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'activeCCDR', 'querystring', req, activeCCDRschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var passiveCCDRschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "DPRNo", "required": true, "in": "body", "type": "string", "description": "DPRNo", "isEncrypt": false }, { "name": "Department", "required": true, "in": "body", "type": "string", "description": "Department", "isEncrypt": false }, { "name": "PickListNumber", "required": true, "in": "body", "type": "string", "description": "PickListNumber", "isEncrypt": false }, { "name": "Unit", "required": true, "in": "body", "type": "string", "description": "Unit", "isEncrypt": false }, { "name": "GeneralInstruction", "required": true, "in": "body", "type": "string", "description": "GeneralInstruction", "isEncrypt": false }, { "name": "PackagingOperation", "required": true, "in": "body", "type": "string", "description": "PackagingOperation", "isEncrypt": false }, { "name": "InnerBoxPacking", "required": true, "in": "body", "type": "string", "description": "InnerBoxPacking", "isEncrypt": false }, { "name": "OuterBoxPacking", "required": true, "in": "body", "type": "string", "description": "OuterBoxPacking", "isEncrypt": false }, { "name": "ShipmentTracking", "required": true, "in": "body", "type": "string", "description": "ShipmentTracking", "isEncrypt": false }, { "name": "DocumentVerification", "required": true, "in": "body", "type": "string", "description": "DocumentVerification", "isEncrypt": false }, { "name": "EffectiveDate", "required": true, "in": "body", "type": "string", "description": "EffectiveDate", "isEncrypt": false }, { "name": "Destination", "required": true, "in": "body", "type": "string", "description": "Destination", "isEncrypt": false }, { "name": "Misc", "required": true, "in": "body", "type": "string", "description": "Misc", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/transactionapi/passiveCCDR/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'passiveCCDR', 'create', req, passiveCCDRschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/transactionapi/passiveCCDR/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'passiveCCDR', 'get', req, passiveCCDRschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.delete('/transactionapi/passiveCCDR/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'passiveCCDR', 'delete', req, passiveCCDRschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/transactionapi/passiveCCDR/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'passiveCCDR', 'update', req, passiveCCDRschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/transactionapi/passiveCCDR/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'passiveCCDR', 'history', req, passiveCCDRschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/transactionapi/passiveCCDR/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'passiveCCDR', 'querystring', req, passiveCCDRschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var documentsschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "DPRNo", "required": true, "in": "body", "type": "string", "description": "DPRNo", "isEncrypt": false }, { "name": "DocType", "required": true, "in": "body", "type": "string", "description": "DocType", "isEncrypt": false }, { "name": "DocumentHash", "required": true, "in": "body", "type": "string", "description": "DocumentHash", "isEncrypt": false }, { "name": "Status", "required": true, "in": "body", "type": "string", "description": "Status", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/transactionapi/documents/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'documents', 'create', req, documentsschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/transactionapi/documents/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'documents', 'get', req, documentsschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.delete('/transactionapi/documents/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'documents', 'delete', req, documentsschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/transactionapi/documents/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'documents', 'update', req, documentsschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/transactionapi/documents/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'documents', 'history', req, documentsschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/transactionapi/documents/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'documents', 'querystring', req, documentsschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});

var DRLDocsschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "DPRNo", "required": true, "in": "body", "type": "string", "description": "DPRNo", "isEncrypt": false }, { "name": "ActiveCCDR", "required": true, "in": "body", "type": "string", "description": "ActiveCCDR", "isEncrypt": false }, { "name": "PassiveCCDR", "required": true, "in": "body", "type": "string", "description": "PassiveCCDR", "isEncrypt": false }, { "name": "TaxInvoice", "required": true, "in": "body", "type": "string", "description": "TaxInvoice", "isEncrypt": false }, { "name": "LRcopy", "required": true, "in": "body", "type": "string", "description": "LRcopy", "isEncrypt": false }, { "name": "SealCodeBeforeDispatch", "required": true, "in": "body", "type": "string", "description": "SealCodeBeforeDispatch", "isEncrypt": false }, { "name": "SealCodeAfterDelivery", "required": true, "in": "body", "type": "string", "description": "SealCodeAfterDelivery", "isEncrypt": false }, { "name": "SignedLRcopy", "required": true, "in": "body", "type": "string", "description": "SignedLRcopy", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/transactionapi/DRLDocs/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'DRLDocs', 'create', req, DRLDocsschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/transactionapi/DRLDocs/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'DRLDocs', 'get', req, DRLDocsschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.delete('/transactionapi/DRLDocs/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'DRLDocs', 'delete', req, DRLDocsschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/transactionapi/DRLDocs/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'DRLDocs', 'update', req, DRLDocsschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/transactionapi/DRLDocs/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'DRLDocs', 'history', req, DRLDocsschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/transactionapi/DRLDocs/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'DRLDocs', 'querystring', req, DRLDocsschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
module.exports = router;