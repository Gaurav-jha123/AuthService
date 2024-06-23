// validators/user-validator.js

const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(300).required(),
});

const roleSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  userSchema,
  roleSchema,
};
