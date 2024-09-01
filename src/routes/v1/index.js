const express = require('express');

const UserController = require('../../controllers/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',AuthRequestValidators.validateUserAuthentication, UserController.create);
router.post('/signin', AuthRequestValidators.validateUserAuthentication, UserController.signIn);
router.get('/isAuthenticated', AuthRequestValidators.validateUserAuthentication, UserController.isAuthenticated)
router.get('/isAdmin/:id', AuthRequestValidators.validateIsAdminRequest, UserController.isAdmin)
router.post('/request-password-reset', UserController.requestPasswordReset);
router.get('/reset-password', UserController.resetPassword);

 
module.exports = router;
