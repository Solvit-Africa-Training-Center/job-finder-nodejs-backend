import express, { Express } from "express";
import { config as Dotenv } from "dotenv";
Dotenv();

import { configs } from "./config";
import { initialize } from "./database";
import mainRoute from "./routes/index";

const app: Express = express();

// global middlewares
app.use(express.json());

// routes
app.use("/api/v1", mainRoute);

const startApp = async () => {
  try {
    // const Db = await initialize();
    // await Db.sequalize.authenticate();

    // console.log("Database connected");

    app.listen(configs.port, () => {
      console.log(`Server running on port ${configs.port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startApp();

export default app;
