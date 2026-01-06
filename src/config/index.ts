interface ServerInterface {
  port: number;
  prefix: string;
  jwtSecret?: string;
}

export const configs: ServerInterface = {
  port: Number(process.env.PORT),
  prefix: String(process.env.PREFIX),
  jwtSecret: process.env.JWT_SECRET,
};

export * from './db';
export * from './swagger';
