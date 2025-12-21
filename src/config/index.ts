interface ServerInterface {
  port: number;
  prefix: string;
}

export const configs: ServerInterface = {
  port: Number(process.env.PORT),
  prefix: String(process.env.PREFIX),
};

export * from "./database";
