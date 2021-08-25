const config = require('./index');

const db = config.db;
const userName = db.userName;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    userName,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};