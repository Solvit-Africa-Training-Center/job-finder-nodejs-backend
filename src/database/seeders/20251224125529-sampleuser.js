'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'sampleusers',
      [
        {
          email: 'admin@solvit.africa',
          password: 'admin123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user@solvit.africa',
          password: 'user123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sampleusers', null, {});
  },
};
