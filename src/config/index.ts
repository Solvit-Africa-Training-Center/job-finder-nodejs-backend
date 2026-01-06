interface ServerInterface {
  port: number;
  prefix: string;
}

interface JWTConfigInterface {
  secret: string;
  expiresIn: string;
}


export const configs: ServerInterface = {
  port: Number(process.env.PORT),
  prefix: String(process.env.PREFIX),
};


export const jwtConfig: JWTConfigInterface = {
  secret: process.env.JWT_SECRET || 'super_secret_key',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
};


export * from './db';
export * from './swagger';
