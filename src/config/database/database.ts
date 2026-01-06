import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
  database: process.env.DB_DEV_NAME || 'job_finder',
  username: process.env.DB_DEV_USERNAME || 'postgres',
  password: process.env.DB_DEV_PASSWORD || 'password',
  host: process.env.DB_DEV_HOST || 'localhost',
  port: parseInt(process.env.DB_DEV_PORT || '5432'),
  dialect: 'postgres' as const,
};

// Create Sequelize instance
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
    
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    
    timezone: '+00:00',
    
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
  }
);

// Function to check if database exists
export const checkDatabaseExists = async (): Promise<boolean> => {
  const tempSequelize = new Sequelize(
    'postgres', 
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: false,
    }
  );

  try {
    const result = await tempSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${dbConfig.database}'`,
      { type: 'SELECT' }
    );
    
    await tempSequelize.close();
    return result.length > 0;
  } catch (error) {
    await tempSequelize.close();
    throw error;
  }
};

// Function to create database
export const createDatabase = async (): Promise<void> => {
  const tempSequelize = new Sequelize(
    'postgres',
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: false,
    }
  );

  try {
    await tempSequelize.query(`CREATE DATABASE ${dbConfig.database}`);
    console.log(`Database '${dbConfig.database}' created successfully.`);
    await tempSequelize.close();
  } catch (error) {
    await tempSequelize.close();
    throw error;
  }
};

// Initialize database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Check if database exists
    const dbExists = await checkDatabaseExists();
    
    if (!dbExists) {
      console.log(` Database '${dbConfig.database}' does not exist. Creating...`);
      await createDatabase();
    } else {
      console.log(` Database '${dbConfig.database}' already exists.`);
    }
    
    // Test connection
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export default sequelize;