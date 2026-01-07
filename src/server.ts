import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { configs, swaggerDocument } from './config';
import { connectToDb } from './database';
import { errorHandler, applyRateLimit } from './middlewares';
import mainRoute from './routes';

const app: Express = express();

const startApp = async () => {
  try {
    app.use(helmet());
    app.use(cors());

    applyRateLimit(app);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await connectToDb();

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(configs.prefix, mainRoute);

    app.use(errorHandler);

    app.listen(configs.port, () => {
      console.log(`Server running on port ${configs.port}`);
      console.log(
        `API documentation: http://localhost:${configs.port}/api-docs`,
      );
    });
  } catch (error) {
    console.log('Error starting: ', error);
  }
};

startApp();

export default app;
