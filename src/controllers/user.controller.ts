import { Request, Response } from 'express';
import { UserService } from '../services';

const userService = new UserService();

export class UserController {
  getUsers = async (req: Request, res: Response) => {
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  };
}
