import express, { Express } from "express";
import { config as Dotenv } from "dotenv";
Dotenv();

import { configs } from "./config";
import { connectToDb } from "./database";
import mainRoute from "./routes";
import { setupSwagger } from "./docs/swagger"; // ✅ ADD THIS

const app: Express = express();

const startApp = async () => {
  try {
    // Connect to database
    const { sequalize, ...models } = await connectToDb();

    // Middlewares
    app.use(express.json());

    // Swagger Documentation
    setupSwagger(app); // ✅ ADD THIS

    // API Routes
    app.use(configs.prefix, mainRoute);

    // Start Server
    app.listen(configs.port, () => {
      console.log(` Server running on port ${configs.port}`);
      console.log(` Swagger Docs: http://localhost:${configs.port}/api/docs`);
    });
  } catch (error) {
    console.log(" Error starting server: ", error);
  }
};

startApp();

export default app;
