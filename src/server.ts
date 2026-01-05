import express, { Express } from 'express';
import { config as Dotenv } from 'dotenv';
Dotenv();

import { configs } from './config';
import { initialize } from './database';
import jobRoutes from './routes/job.routes';
import jobViewRoutes from './routes/jobview.routes'; 

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startApp = async () => {
  try {
    const Db = await initialize();
    await Db.sequalize.authenticate();

    app.use('/api/v1/jobs', jobRoutes);
    app.use('/api/v1/job-views', jobViewRoutes);

    app.listen(configs.port, () =>
      console.log(`Server running on port ${configs.port}`)
    );
  } catch (error) {
    console.log('Error starting: ', error);
  }
};

startApp();

export default app;
