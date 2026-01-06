import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';
import { successResponse } from '../utils';

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return successResponse(res, {
      statusCode: 401,
      message: 'unauthorized actions',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as {
      id: number;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    const { message, stack } = error as Error;
    return successResponse(res, {
      data: stack,
      message,
      statusCode: 500,
    });
  }
};
