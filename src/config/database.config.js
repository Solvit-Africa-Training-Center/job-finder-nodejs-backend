require('dotenv').config();

const prefixConf = () => {
  const prefixEnv = process.env.NODE_ENV || 'development';
  let prefix;
  switch (prefixEnv) {
    case 'development':
      prefix = 'DEV';
      break;
    case 'testing':
      prefix = 'TEST';
      break;
    case 'production':
      prefix = 'PROD';
      break;
    default:
      prefix = 'DEV';
      break;
  }
  return prefix;
};

const prefix = prefixConf();

module.exports = {
  development: {
    username: process.env[`DB_${prefix}_USERNAME`],
    password: process.env[`DB_${prefix}_PASSWORD`],
    database: process.env[`DB_${prefix}_NAME`],
    host: process.env[`DB_${prefix}_HOST`] || 'localhost',
    port: parseInt(process.env[`DB_${prefix}_PORT`], 10),
    dialect: 'postgres',
  },
};