import { Response } from 'express';

interface SuccessResponseOptions<T = undefined> {
  data?: T;
  message?: string;
  statusCode?: number;
}

interface ErrorDetail {
  field?: string;
  message: string;
}

interface ErrorResponseOptions {
  message: string;
  statusCode?: number;
  errors?: ErrorDetail[];
}

export const successResponse = <T>(
  res: Response,
  options: SuccessResponseOptions<T>,
) => {
  const { data, message = 'Request successful', statusCode = 200 } = options;

  return res.status(statusCode).json({
    statusCode,
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

export const errorResponse = (res: Response, options: ErrorResponseOptions) => {
  const { message, statusCode = 500, errors } = options;

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    ...(errors && errors.length > 0 && { errors }),
  });
};
