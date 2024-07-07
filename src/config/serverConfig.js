const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
    PORT : process.env.PORT, 
    SALT : bcrypt.genSaltSync(10),
    JWT_KEY : process.env.JWT_KEY,
    DEV_USERNAME: process.env.DEV_USERNAME,
    DEV_PASSWORD: process.env.DEV_PASSWORD,
    DEV_DATABASE: process.env.DEV_DATABASE,
    DEV_HOST: process.env.DEV_HOST,
    DEV_PORT: process.env.DEV_PORT,
}