<<<<<<< HEAD:src/config/db.ts
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
      prefix = 'DEV';
      break;
  }
  return prefix;
};
=======
// config/database.ts
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
>>>>>>> 2c77a37 (done):src/config/database.ts

dotenv.config();

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  logging: boolean | ((sql: string, timing?: number) => void);
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

const config = {
  development: {
    username: process.env.DB_DEV_USERNAME || 'postgres',
    password: process.env.DB_DEV_PASSWORD || '',
    database: process.env.DB_DEV_NAME || 'job_finder',
    host: process.env.DB_DEV_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_DEV_PORT || '5432'),
    dialect: 'postgres' as Dialect,
    logging: console.log
  },
  test: {
    username: process.env.DB_TEST_USERNAME || 'postgres',
    password: process.env.DB_TEST_PASSWORD || '',
    database: process.env.DB_TEST_NAME || 'job_finder_test',
    host: process.env.DB_TEST_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_TEST_PORT || '5432'),
    dialect: 'postgres' as Dialect,
    logging: false
  },
  production: {
    username: process.env.DB_PROD_USERNAME || '',
    password: process.env.DB_PROD_PASSWORD || '',
    database: process.env.DB_PROD_NAME || '',
    host: process.env.DB_PROD_HOST || '',
    port: parseInt(process.env.DB_PROD_PORT || '5432'),
    dialect: 'postgres' as Dialect,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

export default config;