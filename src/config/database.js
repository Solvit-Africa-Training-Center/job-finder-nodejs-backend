require('dotenv').config(); // ✅ MUST be first

/**
 * database configuration for sequelize CLI migrations
 */

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
  }

  return prefix;
};

const prefix = prefixConf();

/* 🔎 DEBUG LOGS — TEMPORARY */
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PREFIX:', prefix);
console.log('DB PASSWORD:', process.env[`DB_${prefix}_PASSWORD`]);

module.exports = {
  development: {
    username: process.env[`DB_${prefix}_USERNAME`],
    password: String(process.env[`DB_${prefix}_PASSWORD`]),
    database: process.env[`DB_${prefix}_NAME`],
    host: 'localhost',
    port: Number(process.env[`DB_${prefix}_PORT`]) || 5432,
    dialect: 'postgres',
    logging: false,
  },

  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: 'localhost',
    port: Number(process.env.DB_TEST_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  },

  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST || 'localhost',
    port: Number(process.env.DB_PROD_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
