import express, { Express } from 'express';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { configs } from './config';
import { initialize } from './database';

const app: Express = express();

const startApp = async () => {
  try {
    const Db = await initialize();
    await Db.sequalize.authenticate();

    app.listen(configs.port, () => console.log(`Server running on port ${configs.port}`));
  } catch (error) {
    console.log('Error starting: ', error);
  }
};

startApp();

export default app;
