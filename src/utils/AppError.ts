// utils/AppError.ts

export interface ErrorDetail {
  field?: string;
  message: string;
}

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errors?: ErrorDetail[];

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: ErrorDetail[],
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}
