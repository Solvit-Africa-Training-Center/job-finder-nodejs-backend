'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'JobLevels',
      [
        {
          name: 'Internship',
          order: 1,
          description: 'Entry-level internship positions',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Junior',
          order: 2,
          description: 'Junior or associate level positions',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mid-Level',
          order: 3,
          description: 'Mid-level professional positions',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Senior',
          order: 4,
          description: 'Senior and lead positions',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Manager',
          order: 5,
          description: 'Management and leadership roles',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JobLevels', null, {});
  },
};
