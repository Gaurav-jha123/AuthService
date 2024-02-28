const UserRepository = require('../repository/user-repository');
const AppErrors = require('../utils/error-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name=='SequelizeValidationError'){
                throw error;
            }
            console.log("Something went wrong in Service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const compare = this.checkPassword(plainPassword, user.password);
            if (!compare) {
                console.log("Password doesn't match");
                throw { error: 'Incorrect password' };
            }
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        } catch (error) {
            if(error.name=='AttributeNotFound')
            {
                throw error;
            }
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: 'Invalid token' }
            }
            const user =await this.userRepository.getById(response.id);
            if (!user) {
                throw { error: "No user with the corresponding token exists" };
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in validating token", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong while comparing password refer checkPassword fn");
            throw error;
        }
    }

    isAdmin(userId)
    {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Sometihng went wrong in the service layer");
            throw error;
        }
    }
}

module.exports = UserService;