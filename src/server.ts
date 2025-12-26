import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { configs } from './config';
import { connectToDb } from './database';
import mainRoute from './routes';
import { applyRateLimit } from './middlewares';

const app: Express = express();

const startApp = async () => {
  try {
    app.use(helmet());
    applyRateLimit(app);
    app.use(cors());
    app.use(express.json());

    await connectToDb();

    app.use(configs.prefix, mainRoute);

    app.listen(configs.port, () =>
      console.log(`Server running on port ${configs.port}`),
    );
  } catch (error) {
    console.log('Error starting: ', error);
  }
};

startApp();

export default app;
