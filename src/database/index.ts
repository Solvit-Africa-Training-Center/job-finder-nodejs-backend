import { Sequelize } from 'sequelize';
import { databaseConnection } from '../config';
import { allModel } from './models';

interface DatabaseConfigInterface {
  database: string;
  username: string;
  password: string;
  port: string;
}

const config = databaseConnection() as DatabaseConfigInterface;

let sequelize = new Sequelize({
  database: 'postgres',
  username: config.username,
  password: config.password,
  port: Number(config.port),
  dialect: 'postgres',
});

const checkDb = async () => {
  try {
    const [result] = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${config.database}'`,
    );

    if (result.length === 0) {
      console.log(
        `Database '${config.database}' doesnot exist. Creating it...`,
      );
      await sequelize.query(`CREATE DATABASE "${config.database}"`);
    }
  } catch (error) {
    console.error('Error checking or creating database:', error);
    throw error;
  }
};

export const connectToDb = async () => {
  try {
    await checkDb();

    sequelize = new Sequelize({
      database: config.database,
      username: config.username,
      password: config.password,
      port: Number(config.port),
      dialect: 'postgres',
    });

    await sequelize.authenticate();
    console.log('Database Connected');

    const models = allModel(sequelize);

    Object.values(models).forEach((model: any) => {
      if (typeof model.associate === 'function') {
        model.associate(models);
      }
    });

    return { sequelize, ...models };
  } catch (error) {
    console.error('Error connecting to database: ', error);
    throw error;
  }
};