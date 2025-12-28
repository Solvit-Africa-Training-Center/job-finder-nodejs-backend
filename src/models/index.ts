import { Sequelize } from 'sequelize';
import { initAdmin } from './Admin';

export const allModel = (sequelize: Sequelize) => {
  const Admin = initAdmin(sequelize);

  return {
    Admin,
  };
};
