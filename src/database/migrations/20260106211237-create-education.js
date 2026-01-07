'use strict';

/**
 * Migration for creating education table
 * Stores candidate educational background
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('education', {
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
      institution: {
        type: Sequelize.STRING(200),
        allowNull: false,
        comment: 'Educational institution name',
      },
      degree: {
        type: Sequelize.STRING(150),
        allowNull: false,
        comment: 'Degree or certification obtained',
      },
      fieldOfStudy: {
        type: Sequelize.STRING(150),
        allowNull: false,
        comment: 'Field or major of study',
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: 'Education start date',
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: 'Education end date',
      },
      isCurrent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Whether currently studying',
      },
      grade: {
        type: Sequelize.STRING(50),
        allowNull: true,
        comment: 'Grade or GPA achieved',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Additional description or achievements',
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
    await queryInterface.addIndex('education', ['candidateProfileId'], {
      name: 'education_candidate_id_idx',
    });
    await queryInterface.addIndex('education', ['isCurrent'], {
      name: 'education_is_current_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('education');
  },
};
