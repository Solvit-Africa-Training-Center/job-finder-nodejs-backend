import express, { Router } from 'express';
import jobCategoryRoutes from "./jobCategory.route";

const mainRoute = Router();



mainRoute.use("/job-category",jobCategoryRoutes)

export default mainRoute;
