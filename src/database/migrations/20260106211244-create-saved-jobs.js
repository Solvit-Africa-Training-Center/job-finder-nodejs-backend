'use strict';

/**
 * Migration for creating saved_jobs junction table
 * Tracks jobs bookmarked by candidates
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('saved_jobs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      candidateProfileId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'candidate_profiles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        comment: 'Foreign key to candidate_profiles',
      },
      jobId: {
        type: Sequelize.UUID,
        allowNull: false,
        // Note: Add foreign key constraint when jobs table is created
        comment: 'Foreign key to jobs table',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Optional notes about the saved job',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add unique constraint to prevent duplicate saves
    await queryInterface.addIndex(
      'saved_jobs',
      ['candidateProfileId', 'jobId'],
      {
        name: 'saved_jobs_unique_idx',
        unique: true,
      },
    );
    await queryInterface.addIndex('saved_jobs', ['candidateProfileId'], {
      name: 'saved_jobs_candidate_id_idx',
    });
    await queryInterface.addIndex('saved_jobs', ['jobId'], {
      name: 'saved_jobs_job_id_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('saved_jobs');
  },
};
