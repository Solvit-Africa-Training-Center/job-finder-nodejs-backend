'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('job_status_history', {
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

      old_status: {
        type: Sequelize.STRING,
        allowNull: false
      },

      new_status: {
        type: Sequelize.STRING,
        allowNull: false
      },

      changed_by: {
        type: Sequelize.UUID,
        allowNull: false,
        // uncomment after getting finished users table
        // references: {
        //   model: 'users',
        //   key: 'id'
        // }
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      changed_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('job_status_history');
  }
};