import express, { Express } from 'express';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { initialize } from './config/database';
import { configs } from './config/database';
import mainRoute from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';


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
const swaggerSpec = swaggerDocument;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
