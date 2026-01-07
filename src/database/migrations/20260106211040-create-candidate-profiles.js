'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidate_profiles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      linkedinUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      portfolioUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      githubUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      expectedSalary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      availability: {
        type: Sequelize.ENUM('immediate', '2weeks', '1month', 'negotiable'),
        allowNull: true,
      },
      isProfileComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      profileCompletionPercentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('candidate_profiles', ['userId'], {
      name: 'candidate_profiles_user_id_idx',
      unique: true,
    });
    await queryInterface.addIndex('candidate_profiles', ['city'], {
      name: 'candidate_profiles_city_idx',
    });
    await queryInterface.addIndex('candidate_profiles', ['country'], {
      name: 'candidate_profiles_country_idx',
    });
    await queryInterface.addIndex('candidate_profiles', ['availability'], {
      name: 'candidate_profiles_availability_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('candidate_profiles');
  },
};
