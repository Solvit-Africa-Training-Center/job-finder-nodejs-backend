'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔹 Fetch required category IDs
    const [categories] = await queryInterface.sequelize.query(
      `
      SELECT id, name FROM "JobCategories"
      WHERE name IN ('Software Development', 'Human Resources')
      `
    );

    // 🔹 Fetch required level IDs
    const [levels] = await queryInterface.sequelize.query(
      `
      SELECT id, name FROM "JobLevels"
      WHERE name IN ('Junior', 'Mid-Level')
      `
    );

    const softwareDevCategoryId = categories.find(
      c => c.name === 'Software Development'
    )?.id;

    const hrCategoryId = categories.find(
      c => c.name === 'Human Resources'
    )?.id;

    const juniorLevelId = levels.find(
      l => l.name === 'Junior'
    )?.id;

    const midLevelId = levels.find(
      l => l.name === 'Mid-Level'
    )?.id;

    if (!softwareDevCategoryId || !hrCategoryId || !juniorLevelId || !midLevelId) {
      throw new Error('Required JobCategory or JobLevel not found. Run seeders in correct order.');
    }

    await queryInterface.bulkInsert(
      'JobTitles',
      [
        {
          name: 'Software Engineer',
          description: 'Designs, develops, and maintains software systems',
          jobCategoryId: softwareDevCategoryId,
          jobLevelId: midLevelId,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Frontend Developer',
          description: 'Builds user interfaces and client-side applications',
          jobCategoryId: softwareDevCategoryId,
          jobLevelId: juniorLevelId,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Backend Developer',
          description: 'Develops server-side logic and APIs',
          jobCategoryId: softwareDevCategoryId,
          jobLevelId: midLevelId,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'DevOps Engineer',
          description: 'Manages CI/CD pipelines and infrastructure',
          jobCategoryId: softwareDevCategoryId,
          jobLevelId: midLevelId,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          name: 'Human Resources Officer',
          description: 'Handles recruitment and employee relations',
          jobCategoryId: hrCategoryId,
          jobLevelId: juniorLevelId,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('JobTitles', null, {});
  },
};
