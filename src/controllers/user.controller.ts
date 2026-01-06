import { Request, Response } from 'express';
import { UserService } from '../services';

export class UserController {
  getUsers = async (req: Request, res: Response) => {
    const users = await UserService.fetchAllUsers();
    res.status(200).json(users);
  };
}
