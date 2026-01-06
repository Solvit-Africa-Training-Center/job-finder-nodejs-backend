'use strict';
const { v4: uuid } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('job_categories', [
      {
        id: uuid(),
        name: 'Software Development',
        slug: 'software-development',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('job_categories', null, {});
  },
};
