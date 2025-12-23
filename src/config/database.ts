import { Sequelize } from 'sequelize';

interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: 'postgres';
}

type Environment = 'development' | 'testing' | 'production';
type EnvironmentPrefix = 'DEV' | 'TEST' | 'PROD';

const prefixConf = (): EnvironmentPrefix => {
  const prefixEnv = (process.env.NODE_ENV || 'development') as Environment;

  const prefixMap: Record<Environment, EnvironmentPrefix> = {
    development: 'DEV',
    testing: 'TEST',
    production: 'PROD',
  };

  return prefixMap[prefixEnv];
};

export const databaseConnection = (): DatabaseConfig => {
  const prefix = prefixConf();

  const database = process.env[`DB_${prefix}_NAME`];
  const username = process.env[`DB_${prefix}_USERNAME`];
  const password = process.env[`DB_${prefix}_PASSWORD`];
  const host = process.env[`DB_${prefix}_HOST`] || 'localhost';
  const port = Number(process.env[`DB_${prefix}_PORT`]) || 5432;

  if (!database || !username || !password) {
    throw new Error(
      `Missing required database configuration for ${prefix} environment`
    );
  }

  return {
    database,
    username,
    password,
    host,
    port,
    dialect: 'postgres',
  };
};

const config = databaseConnection();

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connection established successfully (${process.env.NODE_ENV})`);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;