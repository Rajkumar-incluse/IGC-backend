'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('Helper');
logger.level = 'DEBUG';

var getLogger = function(moduleName) {
	var logger = log4js.getLogger(moduleName);
    logger.level = 'DEBUG';
	return logger;
};

const CHAINCODE_ACTIONS = {
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete'
}

const USER_ROLES = {
	ADMIN: 'admin',
	WAREHOUSE_SUPERVISOR: 'warehouse_supervisor',
	WAREHOUSE_ASSOCIATE: 'warehouse_associtate',
	MANAGER: 'manager',
	CFA: 'cfa',
	TRANSPORTER: 'transporter'
}

const USER_STATUS = {
	ACTIVE: 'active',
	INACTIVE: 'inactive'
}

exports.getLogger = getLogger;
exports.CHAINCODE_ACTIONS = CHAINCODE_ACTIONS
exports.USER_ROLES = USER_ROLES
exports.USER_STATUS = USER_STATUS
