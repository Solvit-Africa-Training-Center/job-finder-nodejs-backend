import express, { Express } from 'express';
import { config as Dotenv } from 'dotenv';
import path from 'path';
Dotenv();
import { configs } from './config';
import { initialize } from './database';
import blogRoutes from './routes/blog.routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const startApp = async () => {
  try {
    await initialize();
    console.log(' Database initialized successfully');

    app.use(`${configs.prefix}/blogs`, blogRoutes);

    app.listen(configs.port, () => {
      console.log(` Server running on http://localhost:${configs.port}`);
      console.log(`API prefix: ${configs.prefix}`);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Error starting app:', error);
    process.exit(1);
  }
};

startApp();

export default app;