interface JwtConfig {
  secret: string;
  expiresIn: string | number;
}

const validateJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is not set. Please configure it in your .env file.',
    );
  }
  return secret;
};

export const jwtConfig: JwtConfig = {
  secret: validateJwtSecret(),
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
};
