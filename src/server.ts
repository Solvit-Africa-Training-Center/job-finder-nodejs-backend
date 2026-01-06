import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { config as Dotenv } from 'dotenv';
import path from 'path';
Dotenv();
import { configs, swaggerDocument } from './config';
import { connectToDb } from './database';
import { errorHandler, applyRateLimit } from './middlewares';
import mainRoute from './routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const startApp = async () => {
  try {
    // security middleware
    app.use(helmet());
    app.use(cors());

    // rate limit
    applyRateLimit(app);

    // body parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // database connection
    await connectToDb();

    // swagger documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // routes
    app.use(configs.prefix, mainRoute);

    // error handler
    app.use(errorHandler);

    app.listen(configs.port, () => {
      console.log(`Server running on port ${configs.port}`);
      console.log(
        `API documentation: http://localhost:${configs.port}/api-docs`,
      );
    });
  } catch (error) {
    console.error('Error starting app:', error);
    process.exit(1);
  }
};

startApp();

export default app;
