'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'JobLevels',
      [
        {
          name: 'Internship',
          description: 'Entry-level internship positions',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Junior',
          description: 'Junior or associate level positions',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Mid-Level',
          description: 'Mid-level professional positions',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Senior',
          description: 'Senior and lead positions',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Manager',
          description: 'Management and leadership roles',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('JobLevels', null, {});
  },
};
