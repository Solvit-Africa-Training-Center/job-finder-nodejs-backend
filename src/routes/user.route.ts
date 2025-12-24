import express, { Router } from "express";
import { UserController } from "../controllers";

const userRoute: Router = express.Router();
const userController = new UserController();

userRoute.get("/", userController.getUsers);

export default userRoute;
