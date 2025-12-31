'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'JobCategories',
      [
        {
          name: 'Information Technology',
          industry: 'Technology',
          description: 'Software, hardware, and IT services',
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Software Development',
          industry: 'Technology',
          description: 'Backend, frontend, and mobile development',
          parentId: null, // will update later if needed
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Human Resources',
          industry: 'Business',
          description: 'Recruitment and employee management',
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Finance',
          industry: 'Business',
          description: 'Accounting, auditing, and finance roles',
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('JobCategories', null, {});
  },
};
