interface ServerInterface {
  port: number;
  prefix: string;
  jwtSecretKey: string;
}

export const configs: ServerInterface = {
  port: Number(process.env.PORT),
  prefix: String(process.env.PREFIX),
  jwtSecretKey: String(process.env.JWT_SECRET),
};

export * from './db';
export * from './swagger';
