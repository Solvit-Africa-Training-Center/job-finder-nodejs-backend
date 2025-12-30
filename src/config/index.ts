interface ServerInterface {
  port: number;
  prefix: string;
}

export const configs: ServerInterface = {
  port: Number(process.env.PORT) || 8000,
  prefix: process.env.PREFIX || "/api/v1",
};

export * from "./database";
