'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job_approvals', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      job_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // uncomment after sando creates a jobs database
        // references: {
        //   model: 'jobs',
        //   key: 'id'
        // },
        onDelete: 'CASCADE'
      },

      admin_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // uncomment after getting finished users table
        // references: {
        //   model: 'users',
        //   key: 'id'
        // }
      },

      status: {
        type: Sequelize.ENUM('Approved', 'Rejected', 'Pending'),
        allowNull: false,
        defaultValue: 'Pending'
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      reviewed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('job_approvals');
  }
};