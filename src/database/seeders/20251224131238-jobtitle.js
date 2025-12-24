'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'JobTitles',
      [
        {
          name: 'Software Engineer',
          description: 'Designs, develops, and maintains software systems',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Frontend Developer',
          description: 'Builds user interfaces and client-side applications',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Backend Developer',
          description: 'Develops server-side logic and APIs',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'DevOps Engineer',
          description: 'Manages CI/CD pipelines and infrastructure',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Human Resources Officer',
          description: 'Handles recruitment and employee relations',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JobTitles', null, {});
  },
};
