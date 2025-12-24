import express, { Express } from "express";
import cors from "cors";
import { config as Dotenv } from "dotenv";
Dotenv();
import { configs } from "./config";
import { connectToDb } from "./database";
import mainRoute from "./routes";

const app: Express = express();

const startApp = async () => {
  try {
    const {sequelize,...models}= await connectToDb();

    app.set("models",models)

    app.use(cors());
    app.use(express.json());
    app.use(configs.prefix, mainRoute);

    app.listen(configs.port, () =>
      console.log(`Server running on port ${configs.port}`)
    );
  } catch (error) {
    console.log("Error starting: ", error);
  }
};

startApp();

export default app;
