'use strict';

/**
 * Migration for creating experience table
 * Stores candidate work experience history
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('experience', {
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
      companyName: {
        type: Sequelize.STRING(200),
        allowNull: false,
        comment: 'Company or organization name',
      },
      jobTitle: {
        type: Sequelize.STRING(150),
        allowNull: false,
        comment: 'Job title or position',
      },
      employmentType: {
        type: Sequelize.ENUM(
          'full-time',
          'part-time',
          'contract',
          'internship',
          'freelance',
        ),
        allowNull: false,
        comment: 'Type of employment',
      },
      location: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: 'Job location',
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: 'Employment start date',
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: 'Employment end date',
      },
      isCurrent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Whether currently employed here',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Job description and responsibilities',
      },
      achievements: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Key achievements and accomplishments',
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
    await queryInterface.addIndex('experience', ['candidateProfileId'], {
      name: 'experience_candidate_id_idx',
    });
    await queryInterface.addIndex('experience', ['isCurrent'], {
      name: 'experience_is_current_idx',
    });
    await queryInterface.addIndex('experience', ['employmentType'], {
      name: 'experience_employment_type_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('experience');
  },
};
