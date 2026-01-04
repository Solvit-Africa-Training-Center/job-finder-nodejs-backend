<<<<<<< HEAD
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
=======
﻿import express, { Express } from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/routes/auth.routes";
import sequelize from "./database";

dotenv.config();
>>>>>>> 2c77a37 (done)

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Job Finder API",
    version: "1.0.0",
    endpoints: {
      login: "POST /api/v1/auth/login",
      logout: "POST /api/v1/auth/logout",
      forgotPassword: "POST /api/v1/auth/forgot-password",
      resetPassword: "POST /api/v1/auth/reset-password"
    }
  });
});

// Test database connection
const startServer = async () => {
  try {
<<<<<<< HEAD
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
=======
    await sequelize.authenticate();
    console.log("Database connected");

    // Sync models (create tables)
    await sequelize.sync({ alter: true });
    console.log("Database tables synced");

    app.listen(PORT, () => {
      console.log(`
      Server running on port ${PORT}
      http://localhost:${PORT}
      Auth API: http://localhost:${PORT}/api/v1/auth
      `);
>>>>>>> 2c77a37 (done)
    });
  } catch (error) {
    console.error("Server error:", error);
    process.exit(1);
  }
};

startServer();
