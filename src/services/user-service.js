const UserRepository = require('../repository/user-repository');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { EMAIL_USER, EMAIL_PASS, EMAIL_SERVICE } = require('../config/serverConfig')
const { SALT } = require('../config/serverConfig');


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            logger.info('User created in service', { userId: user.id });
            return user;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                logger.error('Validation error in user service', { error });
                throw error;
            }
            logger.error('Service error in creating user', { error });
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const compare = this.checkPassword(plainPassword, user.password);
            if (!compare) {
                logger.error("Password doesn't match for user", { email });
                throw { error: 'Incorrect password' };
            }
            const newJWT = this.createToken({ email: user.email, id: user.id });
            logger.info('JWT created successfully for user', { email });
            return newJWT;
        } catch (error) {
            if (error.name == 'AttributeNotFound') {
                logger.error('Email not found in user service', { email, error });
                throw error;
            }
            logger.error('Service error in signing in user', { email, error });
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                logger.error('Invalid token in authentication');
                throw { error: 'Invalid token' };
            }
            const user = await this.userRepository.getById(response.id);
            if (!user) {
                logger.error('No user found for token', { token });
                throw { error: "No user with the corresponding token exists" };
            }
            logger.info('Token verified successfully', { userId: user.id });
            return user;
        } catch (error) {
            logger.error('Service error in token verification', { token, error });
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            logger.info('Token created successfully', { user });
            return result;
        } catch (error) {
            logger.error('Service error in token creation', { user, error });
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            logger.info('Token verified successfully', { token });
            return response;
        } catch (error) {
            logger.error('Service error in validating token', { token, error });
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            logger.error('Service error in password comparison', { error });
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const isAdmin = await this.userRepository.isAdmin(userId);
            logger.info('Admin status checked successfully', { userId, isAdmin });
            return isAdmin;
        } catch (error) {
            logger.error('Service error in checking admin status', { userId, error });
            throw error;
        }
    }

    async requestPasswordReset(email) {
        const user = await this.userRepository.getByEmail(email);
        if (!user) throw new Error('User not found');

        // Generate reset token
        const token = crypto.randomBytes(32).toString('hex');
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1); 

        // Store the token and expiration date in the Users table
        await this.userRepository.savePasswordResetToken(user.id, token, expirationDate);

        // Send the email
        const transporter = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });
        await transporter.sendMail({
            host: "smtp.gmail.com",
            port: 465,
            from : EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `Please use the following Token to reset your password: ${token}`,
        });
    }

    async resetPassword(token, newPassword) {
        // Validate the token
        const user = await this.userRepository.findUserByToken(token);
        console.log(`the user is ${user}`);
        
        if (!user) throw new Error('Invalid or expired token retry sending a request to reset your password');
        console.log(`new pass beofre has is ${user}`);
        
        const newPass = bcrypt.hashSync(newPassword , SALT);
        // Update the user's password and clear the token
        await this.userRepository.updatePassword(user.id, newPass);
        console.log(`new pass after hashing is ${newPass}`);
        
        return newPass; // Send the new password to the user
    }

}

module.exports = UserService;
