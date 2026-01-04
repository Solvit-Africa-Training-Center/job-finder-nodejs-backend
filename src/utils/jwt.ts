import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

export const generateToken = (userId: number, email: string, userType: string): string => {
  return jwt.sign(
    { userId, email, userType },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (userId: number): string => {
  return jwt.sign(
    { userId },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch {
    return null;
  }
};
