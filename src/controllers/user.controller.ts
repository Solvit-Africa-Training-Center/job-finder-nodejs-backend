import { Request, Response } from 'express';
import { UserService } from '../services';

const userService = new UserService();

export class UserController {
  // GET /users
  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.fetchAllUsers();
      res.status(200).json({ users });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        res.status(500).json({ message });
      }
  };

  // PATCH /users/:id/block
  blockUserController = async (req: Request, res: Response) => {
    try {
      const user = await userService.blockUser(Number(req.params.id));
      res.status(200).json({ message: 'User blocked', user });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        res.status(400).json({ message });
      }
  };

  // PATCH /users/:id/unblock
  unblockUserController = async (req: Request, res: Response) => {
    try {
      const user = await userService.unblockUser(Number(req.params.id));
      res.status(200).json({ message: 'User unblocked', user });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      res.status(400).json({ message });
    }
  };

  // PATCH /users/:id/activate
  activateUserController = async (req: Request, res: Response) => {
    try {
      const user = await userService.activateUser(Number(req.params.id));
      res.status(200).json({ message: 'User activated', user });
    } catch (e: unknown) {
const message = e instanceof Error ? e.message : String(e);
      res.status(400).json({ message });
    }
  };

// PATCH /users/:id/deactivate
  deactivateUserController = async (req: Request, res: Response) => {
      try {
        const user = await userService.deactivateUser(Number(req.params.id));
        res.status(200).json({ message: 'User deactivated', user });
      } catch (e: unknown) {
       const message = e instanceof Error ? e.message : String(e);
      res.status(400).json({ message });
      }
  };

}
