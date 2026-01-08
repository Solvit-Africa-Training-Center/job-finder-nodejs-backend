/*if (error) {
        const messages = error.details
          .map((detail) => detail.message)
          .join(', ');
        throw new AppError(messages, 400);
      }*/
// middlewares/validate.ts

import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { AppError, ErrorDetail } from '../utils/AppError';

type ValidationSource = 'body' | 'query' | 'params';

/**
 * Validate request data using a Joi schema
 * - returns structured errors: [{ field, message }]
 * - strips unknown fields
 */
export const validate =
  (schema: Schema, source: ValidationSource = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate((req as any)[source], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const details: ErrorDetail[] = error.details.map((d) => ({
          field: d.path?.length ? d.path.join('.') : undefined,
          message: d.message.replace(/"/g, ''),
        }));

        throw new AppError('Validation failed', 400, details);
      }

      // Replace request data with validated data
      (req as any)[source] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
