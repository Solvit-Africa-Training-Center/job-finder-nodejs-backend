import express, { Router } from "express";
import userRoute from "./user.route";

const mainRoute: Router = express.Router();

mainRoute.use("/user", userRoute);

export default mainRoute;
