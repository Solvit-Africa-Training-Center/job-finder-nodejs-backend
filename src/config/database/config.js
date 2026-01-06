require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME || 'postgres',
    password: process.env.DB_DEV_PASSWORD || 'password',
    database: process.env.DB_DEV_NAME || 'job_finder',
    host: process.env.DB_DEV_HOST || 'localhost',
    port: parseInt(process.env.DB_DEV_PORT || '5432'),
    dialect: 'postgres',
    
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    
    logging: console.log,
    
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    }
  },
  
  test: {
    username: process.env.DB_TEST_USERNAME || 'postgres',
    password: process.env.DB_TEST_PASSWORD || 'password',
    database: process.env.DB_TEST_NAME || 'job_finder_test',
    host: process.env.DB_TEST_HOST || 'localhost',
    port: parseInt(process.env.DB_TEST_PORT || '5432'),
    dialect: 'postgres',
    logging: false,
  },
  
  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST,
    port: parseInt(process.env.DB_PROD_PORT || '5432'),
    dialect: 'postgres',
    logging: false,
    
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000
    },
  }
};