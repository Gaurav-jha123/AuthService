const ValidationError = require('../utils/validation-error');
const { User, Role } = require('../models/index');
const ClientError = require('../utils/client-error');
const { StatusCodes } = require('http-status-codes');

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == 'SequelizeValidationError') {
        throw new ValidationError(error);

      }
      console.log("Something went wrong on repository layer");
      throw { error };
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId
        }
      });
    } catch (error) {
      console.log("Something went wrong on repository layer");
    }
  }
  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['email', 'id']
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw error;
    }
  }
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail
        }
      });
      if (!user) {
        throw new ClientError(
          'AttributeNotFound',
          'Invalid Email sent in the request',
          'Please check the email as there is no record of the email',
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong while fetching user");
      throw error;
    }
  }
  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      console.log(user);
      const adminRole = await Role.findOne(
        {
          where: {
            name: 'Admin'
          }
        }
      );
      console.log(adminRole);

      const res = await user.hasRole(adminRole);
      console.log(res);
      return res;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

}

module.exports = UserRepository;