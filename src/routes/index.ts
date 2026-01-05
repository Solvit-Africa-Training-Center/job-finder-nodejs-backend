import express, { Router } from "express";

import jobcategoryroute from "./jobcategory.routes";


const mainRoute: Router = express.Router();

// Job Categories
mainRoute.use("/job-categories", jobcategoryroute);

export default mainRoute;
