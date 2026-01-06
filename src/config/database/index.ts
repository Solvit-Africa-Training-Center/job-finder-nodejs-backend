import sequelize, { initializeDatabase } from './database';

// Register models by requiring them so their `init` executes using the configured `sequelize` instance.
const registerModels = () => {
  // Admin models
  require('../../models/Adminmodels/AdminActionLog');
  // Job taxonomy
  require('../../models/Jobs/JobCategory');
  require('../../models/Jobs/JobSubCategory');
  require('../../models/Jobs/JobTitle');
  require('../../models/Jobs/JobLevel');
  // FAQs & templates
  require('../../models/FAQs/FAQ');
  require('../../models/FAQs/CVtemplates');
  require('../../models/FAQs/EmailTemplates');
};

interface ServerInterface {
  port: number;
  prefix: string;
}

export const configs: ServerInterface = {
  port: Number(process.env.PORT) || 3000,
  prefix: String(process.env.PREFIX) || '/api/v1',
};

export const initialize = async () => {
  try {
    await initializeDatabase();

    // Ensure models are loaded and registered
    registerModels();

    console.log('Database initialized and models registered');

    return { sequelize };
  } catch (error) {
    console.error('Error during initializing Db', error);
    throw error;
  }
};

export default sequelize;

