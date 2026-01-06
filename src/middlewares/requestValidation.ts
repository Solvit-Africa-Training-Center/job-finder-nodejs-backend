import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

type sourceType = 'body' | 'params' | 'query';

export const validateSchema =
  (schema: ObjectSchema, source: sourceType) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const { error, value } = schema.validate(data);

    if (error)
      return res.status(400).json({
        error: error.message,
      });

    if (source === 'query') Object.assign(req[source], value);
    else req[source] = value;
    next();
  };
