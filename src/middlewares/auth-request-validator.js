// middlewares/user-middlewares.js

const logger = require('../utils/logger');
const { ClientErrorCodes } = require('../utils/error-codes');
const { userSchema, roleSchema } = require('../utils/validation-schemas');

const validateUserAuthentication = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        logger.error(`Validation error: ${error.details[0].message}`);
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            success: false,
            data: {},
            message: 'Validation error',
            err: error.details[0].message,
        });
    }
    next();
};

const validateIsAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        logger.error('User id not given');
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            success: false,
            data: {},
            message: 'User id not given',
        });
    }
    next();
};

module.exports = {
    validateUserAuthentication,
    validateIsAdminRequest,
};
