import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const mockAuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  req.user = {
    id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    role: 'admin',
  };

  next();
};
