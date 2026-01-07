import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '../utils';

export const validate = (
  schema: Joi.ObjectSchema,
  property: 'body' | 'params' | 'query' = 'body',
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');

      throw new AppError(errorMessage, 400);
    }

    req[property] = value;
    next();
  };
};

export const validateMultiple = (schemas: {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    if (schemas.body) {
      const { error, value } = schemas.body.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        errors.push(...error.details.map((detail) => detail.message));
      } else {
        req.body = value;
      }
    }

    if (schemas.params) {
      const { error, value } = schemas.params.validate(req.params, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        errors.push(...error.details.map((detail) => detail.message));
      } else {
        req.params = value;
      }
    }

    if (schemas.query) {
      const { error, value } = schemas.query.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        errors.push(...error.details.map((detail) => detail.message));
      } else {
        req.query = value;
      }
    }

    if (errors.length > 0) {
      throw new AppError(errors.join(', '), 400);
    }

    next();
  };
};
