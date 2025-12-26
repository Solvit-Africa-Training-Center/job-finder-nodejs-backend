'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'sampleusers',
      [
        {
          email: 'admin@example.com',
          password: 'admin123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user@example.com',
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
