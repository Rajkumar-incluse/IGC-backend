'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('Helper');
logger.level = 'DEBUG';

exports.getLogger = function(moduleName) {
	var logger = log4js.getLogger(moduleName);
    logger.level = 'DEBUG';
	return logger;
};

exports.CHAINCODE_ACTIONS = {
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete'
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

exports.CHAINCODE_CHANNEL = "drlchannel"