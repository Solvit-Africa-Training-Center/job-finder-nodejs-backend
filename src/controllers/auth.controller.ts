import { Request, Response } from 'express';
import { AuthService } from '../services';

export class AuthController {
  static register = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;

      const user = await AuthService.registerUser({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      return res.status(201).json({
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(
        email.trim().toLowerCase(),
        password,
      );
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  };
}
