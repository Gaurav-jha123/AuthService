module.exports = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    port: Number(process.env.DEV_PORT || 3306),
    dialect: 'mysql'
  },
  test: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    port: Number(process.env.DEV_PORT || 3306),
    dialect: 'mysql'
  },
  production: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    port: Number(process.env.DEV_PORT || 3306),
    dialect: 'mysql'
  }
};