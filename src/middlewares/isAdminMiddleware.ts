import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { successResponse } from '../utils';

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== 'ADMIN') {
    return successResponse(res, {
      statusCode: 401,
      message: 'Admin access required',
    });
  }
  next();
};
