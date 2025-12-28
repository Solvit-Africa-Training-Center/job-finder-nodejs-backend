import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/AdminService';

export function adminOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // MOCK
  next();
}
