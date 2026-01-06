'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cv_templates', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      body: Sequelize.TEXT,
      variables: Sequelize.JSON,
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cv_templates');
  },
};
