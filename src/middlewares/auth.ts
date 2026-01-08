import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtConfig } from '../config';
import { AppError } from '../utils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: 'admin' | 'recruiter' | 'candidate';
      isAdmin?: boolean;
    }
  }
}

export interface DecodedToken {
  userId: number;
  userRole: 'admin' | 'recruiter' | 'candidate';
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        'Unauthorized: Missing or invalid Authorization header',
        401,
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, jwtConfig.secret) as DecodedToken;

      req.userId = decoded.userId;
      req.userRole = decoded.userRole;
      req.isAdmin = decoded.userRole === 'admin';

      next();
    } catch {
      throw new AppError('Unauthorized: Invalid or expired token', 401);
    }
  } catch (error) {
    next(error);
  }
};

export const generateToken = (
  userId: number,
  userRole: 'admin' | 'recruiter' | 'candidate',
): string => {
  return jwt.sign({ userId, userRole }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  } as SignOptions);
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAdmin) {
    throw new AppError('Forbidden: Admin access required', 403);
  }
  next();
};

export const ownerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const targetUserId = Number(req.params.id);

  if (req.userId !== targetUserId && !req.isAdmin) {
    throw new AppError('Forbidden: You can only access your own data', 403);
  }
  next();
};
export const recruiterOnly = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.userRole !== 'recruiter' && !req.isAdmin) {
    throw new AppError('Forbidden: Recruiter access required', 403);
  }
  next();
};
