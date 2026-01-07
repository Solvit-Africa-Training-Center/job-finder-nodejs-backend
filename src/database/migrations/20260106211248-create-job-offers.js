'use strict';

/**
 * Migration for creating job_offers table
 * Manages job offers made to candidates
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job_offers', {
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
      recruiterId: {
        type: Sequelize.UUID,
        allowNull: false,
        // Note: Add foreign key constraint when recruiter_profiles table is created
        comment: 'Foreign key to recruiter_profiles table',
      },
      offeredSalary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        comment: 'Offered salary amount',
      },
      offerDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE'),
        comment: 'Date when offer was made',
      },
      expiryDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: 'Offer expiry date',
      },
      status: {
        type: Sequelize.ENUM('pending', 'accepted', 'rejected', 'expired'),
        allowNull: false,
        defaultValue: 'pending',
        comment: 'Current status of the job offer',
      },
      offerLetter: {
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: 'Path or URL to offer letter document',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Additional notes about the offer',
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
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Soft delete timestamp',
      },
    });

    // Add indexes
    await queryInterface.addIndex('job_offers', ['candidateProfileId'], {
      name: 'job_offers_candidate_id_idx',
    });
    await queryInterface.addIndex('job_offers', ['jobId'], {
      name: 'job_offers_job_id_idx',
    });
    await queryInterface.addIndex('job_offers', ['recruiterId'], {
      name: 'job_offers_recruiter_id_idx',
    });
    await queryInterface.addIndex('job_offers', ['status'], {
      name: 'job_offers_status_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('job_offers');
  },
};
