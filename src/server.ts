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
    // security middleware
    app.use(helmet());
    app.use(cors());

    // rate limit
    applyRateLimit(app);

    // body parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // view engine setup
    app.set('view engine', 'ejs');
    app.set('views', './src/templates/web');

    // database connection
    await connectToDb();

    // swagger documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // web routes
    app.get('/login', (req, res) => {
      res.render('login');
    });
    app.get('/messages/:id', (req, res) => {
      res.render('message');
    });
    app.get('/applications/:id', (req, res) => {
      res.render('application');
    });
    app.get('/dashboard', (req, res) => {
      res.render('dashboard');
    });
    // Fallback for any other ID-based route to login
    app.get('/jobs/:id', (req, res) => {
      res.render('login');
    });

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
    console.log('Error starting: ', error);
  }
};

startApp();

export default app;
