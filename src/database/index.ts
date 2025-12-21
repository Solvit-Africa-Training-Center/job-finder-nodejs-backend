import { Sequelize } from 'sequelize';
import { databaseConnection } from '../config';
import { allModel } from './models';
// import { allModel } from "./models";

interface DatabaseConfigInterface {
  database: string;
  username: string;
  password: string;
  port: string;
}

const config = databaseConnection() as DatabaseConfigInterface;

let sequalize = new Sequelize({
  database: 'postgres',
  username: config.username,
  password: config.password,
  port: Number(config.port),
  dialect: 'postgres',
});

const checkDb = async () => {
  try {
    const [result] = await sequalize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${config.database}'`,
    );

    if (result.length === 0) {
      console.log(`Database '${config.database}' doesnot exist. Creating it...`);
      await sequalize.query(`CREATE DATABASE "${config.database}"`);
    }
  } catch (error) {
    console.error('Error checking or creating database:', error);
    throw error;
  }
};

const connectToDb = async () => {
  try {
    await checkDb();

    sequalize = new Sequelize({
      database: config.database,
      username: config.username,
      password: config.password,
      port: Number(config.port),
      dialect: 'postgres',
    });

    await sequalize.authenticate();
    console.log('Database Connected');

    const models = allModel();

    return { sequalize, ...models };
  } catch (error) {
    console.error('Error connecting to database: ', error);
    throw error;
  }
};

export const initialize = async () => {
  try {
    const { sequalize, ...models } = await connectToDb();

    return { sequalize, ...models };
  } catch (error) {
    console.error('Error during inializing Db');
    throw error;
  }
};
