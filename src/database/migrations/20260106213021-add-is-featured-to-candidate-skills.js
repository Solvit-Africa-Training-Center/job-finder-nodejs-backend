'use strict';

/**
 * Migration to add isFeatured column to candidate_skills table
 * Allows candidates to mark certain skills as featured/primary
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('candidate_skills', 'isFeatured', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Whether this skill should be featured/highlighted on profile',
    });

    // Add index for better query performance when filtering featured skills
    await queryInterface.addIndex('candidate_skills', ['isFeatured'], {
      name: 'candidate_skills_is_featured_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      'candidate_skills',
      'candidate_skills_is_featured_idx',
    );
    await queryInterface.removeColumn('candidate_skills', 'isFeatured');
  },
};
