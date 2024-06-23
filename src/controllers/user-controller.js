// controllers/user-controller.js
const UserService = require('../services/user-service');
const logger = require('../utils/logger');

const { ClientErrorCodes, ServerErrorCodes, SuccessCodes } = require('../utils/error-codes');

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
            data: response,
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
            data: response,
            err: {},
            message: 'Successfully Signed in',
        });
    } catch (error) {
        logger.error('Error in sign in', { error });
        return res.status(error.statusCode || 500).json({
            message: error.message,
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
        const response = await userService.isAdmin(req.body.id);
        console.log(req.body.id);
        logger.info('Checked admin status successfully', { userId: req.body.id });
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'Successfully fetched admin status',
        });
    } catch (error) {
        logger.error('Error in checking admin status', { error });
        return res.status(500).json({
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
