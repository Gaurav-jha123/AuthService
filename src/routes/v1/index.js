const express = require('express');

const UserController = require('../../controllers/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',AuthRequestValidators.validateUserAuthentication, UserController.create);
router.post('/signin',AuthRequestValidators.validateUserAuthentication, UserController.signIn);

module.exports = router;
