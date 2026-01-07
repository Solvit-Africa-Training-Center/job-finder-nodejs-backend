'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      participant1Id: {
        type: Sequelize.UUID,
        allowNull: false,
        comment: 'Mock UUID - will be replaced with real User ID later',
      },
      participant2Id: {
        type: Sequelize.UUID,
        allowNull: false,
        comment: 'Mock UUID - will be replaced with real User ID later',
      },
      lastMessageAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Add index for faster queries
    await queryInterface.addIndex('conversations', ['participant1Id']);
    await queryInterface.addIndex('conversations', ['participant2Id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('conversations');
  },
};
