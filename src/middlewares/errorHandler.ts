import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { errorResponse } from '../utils/apiResponse';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const isDev = process.env.NODE_ENV === 'development';
  if (err instanceof AppError) {
    errorResponse(res, {
      message: err.message,
      statusCode: err.statusCode,
      errors: err.errors,
    });
    return;
  }

  console.error('Unexpected Error:', {
    message: err.message,
    stack: isDev ? err.stack : undefined,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });

  errorResponse(res, {
    message: 'Internal server error',
    statusCode: 500,
    ...(isDev
      ? {
          errors: [{ message: err.message }],
        }
      : {}),
  });
};
