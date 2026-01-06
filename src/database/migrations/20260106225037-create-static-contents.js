'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('static_contents', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      content: Sequelize.TEXT,
      type: {
        type: Sequelize.ENUM('FAQ', 'PAGE'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('static_contents');
  },
};
