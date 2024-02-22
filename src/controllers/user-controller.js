const UserService = require('../services/user-service');
const { ClientErrorCodes,
    ServerErrorCodes,
    SucessCodes } = require('../utils/error-codes');

const userService = new UserService();

const create = async(req, res) => {
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(SucessCodes.CREATED).json({
            success : true,
            message : 'Successfullt created a new user',
            data : response,
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message : 'Something went srong',
            data : {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    create
}