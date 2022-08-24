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
const moment = require('moment')

var dprschema = [{ "name": "Id", "required": true, "in": "body", "type": "string", "description": "Id", "isEncrypt": false }, { "name": "CreatedOn", "required": true, "in": "body", "type": "string", "description": "CreatedOn", "isEncrypt": false }, { "name": "CreatedBy", "required": true, "in": "body", "type": "string", "description": "CreatedBy", "isEncrypt": false }, { "name": "IsDelete", "required": true, "in": "body", "type": "boolean", "description": "IsDelete", "isEncrypt": false }, { "name": "DPRNo", "required": true, "in": "body", "type": "string", "description": "DPRNo", "isEncrypt": false }, { "name": "ShipperNumber", "required": true, "in": "body", "type": "string", "description": "ShipperNumber", "isEncrypt": false }, { "name": "ProductList", "required": true, "in": "body", "type": "string", "description": "ProductList", "isEncrypt": false }, { "name": "TransportMode", "required": true, "in": "body", "type": "string", "description": "TransportMode", "isEncrypt": false }, { "name": "StartedAt", "required": true, "in": "body", "type": "string", "description": "StartedAt", "isEncrypt": false }, { "name": "DeliverAt", "required": true, "in": "body", "type": "string", "description": "DeliverAt", "isEncrypt": false }, { "name": "DDCRStatus", "required": true, "in": "body", "type": "string", "description": "DDCRStatus", "isEncrypt": false }, { "name": "Notes", "required": true, "in": "body", "type": "string", "description": "Notes", "isEncrypt": false }]


router.post('/assetapi/dpr/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
    req.body.CreatedOn = moment(new Date()).format();
    req.body.CreatedBy = req.user.userName;
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'dpr', 'create', req, dprschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.get('/assetapi/dpr/get/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'dpr', 'get', req, dprschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.put('/assetapi/dpr/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'dpr', 'update', req, dprschema);
    if (message && message.status == true) {
        res.send(message);
    }
    else {
        res.send(message);
    }
});
router.delete('/assetapi/dpr/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await invoke.invokeTransaction(cp, 'drlchannel', 'dpr', 'delete', req, dprschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.get('/assetapi/dpr/history/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'dpr', 'history', req, dprschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
router.post('/assetapi/dpr/querystring', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let message = await querytranns.query(cp, 'drlchannel', 'dpr', 'querystring', req, dprschema);
    if (message && message.status == true) { res.send(message); }
    else { res.send(message); }
});
module.exports = router;