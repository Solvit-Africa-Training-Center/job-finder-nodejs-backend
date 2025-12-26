require('dotenv/config');

const prefixConf = () => {
  const prefixEnv = process.env.NODE_ENV;
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
      prefix = 'development';
      break;
  }
  return prefix;
};

const db = () => {
  const prefix = prefixConf();

  return {
    database: process.env[`DB_${prefix}_NAME`],
    username: process.env[`DB_${prefix}_USERNAME`],
    password: process.env[`DB_${prefix}_PASSWORD`],
    port: process.env[`DB_${prefix}_PORT`],
    dialect: 'postgres',
  };
};

module.exports = db;
