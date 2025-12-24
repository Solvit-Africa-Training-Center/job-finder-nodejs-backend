'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'JobCategories',
      [
        {
          name: 'Information Technology',
          description: 'Software, hardware, and IT services',
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Software Development',
          description: 'Backend, frontend, and mobile development',
          parentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Human Resources',
          description: 'Recruitment and employee management',
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Finance',
          description: 'Accounting, auditing, and finance roles',
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JobCategories', null, {});
  },
};
