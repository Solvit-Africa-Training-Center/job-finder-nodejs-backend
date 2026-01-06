'use strict';

const { timeStamp } = require('console');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'emailverificationstoken',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
      },
      { timeStamp: false },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emailverificationstoken');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
