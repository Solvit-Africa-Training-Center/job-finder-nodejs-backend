'use strict';

const { INTEGER } = require('sequelize');
/**
 * a table for storing Frequently Asked Questions(FAQs)
 * features:  UUID primary key, category for grouping FAQs, display order, active/inactive status,
 * audit fields: createdBy, updatedBy (UUID references), timestamps: createdAt, updatedAt (auto-managed),
 * deletedAt (soft delete)
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faqs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'The FAQ question text',
      },
      answer: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'The FAQ answer text',
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Category for grouping related FAQs',
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Order in which FAQs should be displayed',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether this FAQ is active and should be displayed',
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'User ID who created this FAQ',
      },
      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'User ID who last updated this FAQ',
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
    await queryInterface.addIndex('faqs', ['category'], {
      name: 'faqs_category_idx',
    });
    await queryInterface.addIndex('faqs', ['isActive'], {
      name: 'faqs_is_active_idx',
    });
    await queryInterface.addIndex('faqs', ['displayOrder'], {
      name: 'faqs_display_order_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('faqs');
  },
};
