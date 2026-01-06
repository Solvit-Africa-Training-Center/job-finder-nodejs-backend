import { NextFunction, Request, Response } from 'express';
import { configs } from '../config';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(
      token,
      configs.jwtSecret as string,
    ) as jwt.JwtPayload;

    req.user = {
      id: decoded.sub as string,
      role: decoded.role as string,
    };
    next();
  } catch (error) {
    const { message, stack } = error as Error;
    res.status(500).json({ message });
    console.log('Error : ', stack);
  }
};

export const authorize =
  (...allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user)
      return res.status(401).json({ message: 'Not authenticated' });

    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: 'Forbidden' });

    next();
  };
