import express, { Router } from "express";

import jobcategoryroute from "./jobcategory.routes";
import joblevelroute from "./joblevel.route";
import jobtitleroute from "./jobtitleroute";

const mainRoute: Router = express.Router();

// Job Categories
mainRoute.use("/job-categories", jobcategoryroute);

// Job Levels
mainRoute.use("/job-levels", joblevelroute);

// Job Titles
mainRoute.use("/job-titles", jobtitleroute);

export default mainRoute;
