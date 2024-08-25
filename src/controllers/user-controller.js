// controllers/user-controller.js
const UserService = require('../services/user-service');
const logger = require('../utils/logger');

const { ClientErrorCodes, ServerErrorCodes, SucessCodes } = require('../utils/error-codes');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
        logger.info('User created successfully', { userId: response.id });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response.email,
            err: {},
        });
    } catch (error) {
        //console.log(error);
        logger.error('Error in create user', { error });
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error,
        });
    }
};

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        logger.info('User signed in successfully', { userId: response.id });
        return res.status(200).json({
            success: true,
            data: [response ,req.body.email , req.body.name || "User"],
            message: 'Successfully Signed in fetch the JWT from above',
        });
    } catch (error) {
        logger.error('Error in sign in', { error });
        return res.status(error.statusCode || 500).json({
            message: 'The given credentials are invalid',
            data: {},
            success: false,
            err: error.explanation,
        });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        logger.info('User authenticated successfully', { userId: response.id });
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'User is authenticated and token is valid',
        });
    } catch (error) {
        logger.error('Error in authentication', { error });
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error,
        });
    }
};



const isAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await userService.isAdmin(userId);        
        if(response == null){
            return res.status(ClientErrorCodes.NOT_FOUND).json({
                success: false,
                err: {},
                data: response,
                message: `There User with id ${userId} is not there in db`,
            });
        }
        logger.info('Checked admin status successfully', { userId: userId });
        return res.status(SucessCodes.OK).json({
            success: true,
            err: {},
            data: response,
            message: (response)? `The user with ${userId} is admin`: `The user with ${userId} is not admin`,
        });
    } catch (error) {
        logger.error('Error in checking admin status', { error });
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error,
        });
    }
};


module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
};
