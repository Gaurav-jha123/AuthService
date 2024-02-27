const UserService = require('../services/user-service');
const { response } = require('express');

const { ClientErrorCodes,
    ServerErrorCodes,
    SucessCodes } = require('../utils/error-codes');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(SucessCodes.CREATED).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(SucessCodes.OK).json({
            sucess: true,
            data: response,
            err: {},
            message: 'Successfully Signed in',
        });
    } catch (error) {
        console.log("something wrong while signing in");
        return res.status(ClientErrorCodes.UNAUTHORISED).json({
            message: 'Wrong credentials have you signed up? if not go to /signup',
            success: false,
            err: error
        });
    }
}
const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: "User is authenticated and token is valid"

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}
const isAdmin=async(req,res)=>
{
    try {
        const response=await userService.isAdmin(req.body.id);
        return res.status(200).json({
            success:true,
            err:{},
            data:response,
            message:"Successfully fetched whether user is admin or not "

        })
    } catch (error) {
        console.log(error);
        return  res.status(500).json({
             message:'Something went wrong',
             data:{},
             success:false,
             err:error  
    });
} 
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}