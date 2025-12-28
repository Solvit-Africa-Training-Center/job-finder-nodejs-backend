import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from './logger';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error({
    method: req.method,
    url: req.url,
    statusCode: err.statusCode || 500,
    message: err.message,
    stack: err.stack,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message,
  });
};
