import express, { Router } from "express";
import BlogRouter from "./blog.routes";


const routes: Router[] = [BlogRouter];
const mainRouter = express();
mainRouter.use(routes);
export { mainRouter };