'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'sampleusers',
      [
        {
          email: 'inonecdreams@gmail.com',
          password: await bcrypt.hash('admin123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'inonecdreams@gmail.com',
          password: await bcrypt.hash('user123', 10),
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
