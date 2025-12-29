import { Response } from 'express';

interface successResponseOptions<T = undefined> {
  data?: T;
  message?: string;
  statusCode?: number;
}

export const successResponse = <T>(
  res: Response,
  options: successResponseOptions<T>,
) => {
  const { data, message, statusCode = 200 } = options;

  return res.status(statusCode).json({
    success: true,
    ...(message && { message }),
    ...(data !== undefined && { data }),
  });
};
