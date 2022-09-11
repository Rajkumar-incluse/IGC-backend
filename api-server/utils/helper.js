'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('Helper');
logger.level = 'DEBUG';
const { v4: uuid } = require('uuid')
const moment = require('moment')

exports.getLogger = function(moduleName) {
	var logger = log4js.getLogger(moduleName);
    logger.level = 'DEBUG';
	return logger;
};

exports.generateId = function(){
	return uuid()
}

exports.getNow = ()=> moment(new Date()).format()

exports.CHAINCODE_ACTIONS = {
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete',
	GET: 'get'
}

exports.USER_ROLES = {
	ADMIN: 'admin',
	SUPERVISOR: 'supervisor',
	ASSOCIATE: 'associate',
	MANAGER: 'manager',
	CFA: 'cfa',
	TRANSPORTER: 'transporter'
}

exports.USER_STATUS = {
	ACTIVE: 'active',
	INACTIVE: 'inactive'
}

exports.CCDR_STATUS = {
	NOT_STARTED: 'not-started',
	IN_PROGRESS: 'in-progress',
	COMPLETED: 'completed',
	REJECTED: 'rejected'
}

exports.CHAINCODE_NAMES = {
	ORGANIZATION: 'Organization',
	DPR: 'dpr',
	CCDR: 'CCDR',
	IOT: 'iot'	
}

exports.DOCUMENT_STATUS = {
	UPLOADED: 'in-progress',
	REJECTED: 'rejected',
	ACCEPTED: 'accepted'
}

exports.DOCUMENT_TYPE = {
	LR_COPY: 'lrCopy',
	SEAL_CODE: 'sealCode',
	TAX_INVOICE: 'taxInvoice',
	SIGNED_LR_COPY: 'signedLrCopy',
	SIGNED_SEAL_CODE: 'signedSealCode'
}

exports.CHAINCODE_CHANNEL = "drlchannel"