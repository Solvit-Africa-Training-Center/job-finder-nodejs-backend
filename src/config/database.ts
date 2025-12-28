const prefixConf = () => {
  const prefixEnv = process.env.NODE_ENV;
  let prefix;
  switch (prefixEnv) {
    case 'development':
      prefix = 'DEV';
      break;
    case 'testing':
      prefix = 'TEST';
      break;
    case 'production':
      prefix = 'PROD';
      break;
    default:
      prefix = 'development';
      break;
  }
  return prefix;
};

export const databaseConnection = () => {
  return {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || '3306', // default mysql port
    dialect: process.env.DB_DIALECT,
  };
};
