import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  getUsers = async (req: Request, res: Response) => {
    const models = req.app.get("models"); // { SampleUser: ... }
    const userService = new UserService(models);
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  };
}
