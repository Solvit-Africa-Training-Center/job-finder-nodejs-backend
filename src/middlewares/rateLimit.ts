import rateLimit from 'express-rate-limit';
import { Express } from 'express';

export const applyRateLimit = (app: Express) => {
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use('/api', apiLimiter);
};
