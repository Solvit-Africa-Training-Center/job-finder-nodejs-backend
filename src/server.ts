import express, { Express } from 'express';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { configs } from './config';
import { initialize } from './database';
import mainRoute from './routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRoute);

const startApp = async () => {
  try {
    const Db = await initialize();
    await Db.sequelize.authenticate();

    app.listen(configs.port, () => console.log(`Server running on port ${configs.port}`));
  } catch (error) {
    console.log('Error starting: ', error);
  }
};

startApp();

export default app;
