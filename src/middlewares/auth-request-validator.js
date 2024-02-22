const { ClientErrorCodes } = require('../utils/error-codes');

const validateUserAuthentication = (req,res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            sucess : true,
            data : {},
            message: 'Something went wrong',
            err: 'Email or password missing in the request'
        });
    }
    next();
}

module.exports = {
    validateUserAuthentication
}