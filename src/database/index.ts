import { Sequelize } from 'sequelize';
import { databaseConnection } from '../config/database';
import { allModel } from '../database/models';

let sequelize: Sequelize;

const checkDb = async (config: ReturnType<typeof databaseConnection>) => {
  try {

    const tempSequelize = new Sequelize({
      database: 'postgres',
      username: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
      dialect: 'postgres',
      logging: false,
    });

    const [result] = await tempSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${config.database}'`
    );

    if (result.length === 0) {
      console.log(`Database '${config.database}' does not exist. Creating it...`);
      await tempSequelize.query(`CREATE DATABASE "${config.database}"`);
      console.log(`Database '${config.database}' created successfully`);
    }

    await tempSequelize.close();
  } catch (error) {
    console.error('Error checking or creating database:', error);
    throw error;
  }
};

const connectToDb = async () => {
  try {
    const config = databaseConnection();

    await checkDb(config);


    sequelize = new Sequelize({
      database: config.database,
      username: config.username,
      password: config.password,
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
    });

    await sequelize.authenticate();
    console.log(`Database connected: ${config.database}`);


    const models = allModel(sequelize);

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized');
    }

    return { sequelize, ...models };
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

export const initialize = async () => {
  try {
    const { sequelize, ...models } = await connectToDb();
    return { sequelize, ...models };
  } catch (error) {
    console.error('Error during database initialization');
    throw error;
  }
};

export { sequelize };