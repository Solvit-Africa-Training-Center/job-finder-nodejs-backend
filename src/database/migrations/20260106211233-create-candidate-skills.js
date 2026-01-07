'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidate_skills', {
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
      },
      skillId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'skills',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      proficiencyLevel: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced', 'expert'),
        allowNull: false,
        defaultValue: 'beginner',
      },
      yearsOfExperience: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
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

    await queryInterface.addIndex(
      'candidate_skills',
      ['candidateProfileId', 'skillId'],
      {
        name: 'candidate_skills_unique_idx',
        unique: true,
      },
    );
    await queryInterface.addIndex('candidate_skills', ['candidateProfileId'], {
      name: 'candidate_skills_candidate_id_idx',
    });
    await queryInterface.addIndex('candidate_skills', ['skillId'], {
      name: 'candidate_skills_skill_id_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('candidate_skills');
  },
};
