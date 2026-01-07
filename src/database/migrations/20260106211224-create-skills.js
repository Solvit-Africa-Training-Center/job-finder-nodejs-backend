'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('skills', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

    await queryInterface.addIndex('skills', ['name'], {
      name: 'skills_name_idx',
      unique: true,
    });
    await queryInterface.addIndex('skills', ['category'], {
      name: 'skills_category_idx',
    });
    await queryInterface.addIndex('skills', ['isActive'], {
      name: 'skills_is_active_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('skills');
  },
};
