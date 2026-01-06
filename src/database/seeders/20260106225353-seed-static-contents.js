'use strict';
const { v4: uuid } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('static_contents', [
      {
        id: uuid(),
        title: 'How to apply',
        content: 'Create an account and apply to jobs.',
        type: 'FAQ',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('static_contents', null, {});
  },
};
