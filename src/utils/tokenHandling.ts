import jwt from 'jsonwebtoken';
import { configs } from '../config';

interface Payload {
  id: string;
}

export const generateEmailToken = (payload: Payload): string => {
  return jwt.sign(payload, configs.jwtSecretKey, {
    expiresIn: '15min',
  });
};

export const verifyToken = (token: string): Payload => {
  return jwt.verify(token, configs.jwtSecretKey) as Payload;
};
