import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const dbConfig = {
  database: process.env.DB_DEV_NAME || 'job_finder',
  username: process.env.DB_DEV_USERNAME || 'postgres',
  password: process.env.DB_DEV_PASSWORD || 'password',
  host: process.env.DB_DEV_HOST || 'localhost',
  port: parseInt(process.env.DB_DEV_PORT || '5432'),
  dialect: 'postgres' as const,
};


export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    
    
    pool: {
      max: 10,        
      min: 0,         
      acquire: 30000, 
      idle: 10000,    
    },
    
    // Logging
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    
  
    timezone: '+00:00',
    
   
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
  }
);


export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log(' Database connection established successfully.');
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
    throw error;
  }
};

// Sync database (use carefully - only in development)
export const syncDatabase = async (force: boolean = false): Promise<void> => {
  try {
    await sequelize.sync({ force, alter: !force });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error(' Database synchronization failed:', error);
    throw error;
  }
};

export default sequelize;