'use strict';

/** @type {import('sequelize-cli').Migration} */
/** table for static page creation  */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('static_pages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'URL identifier for the page',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Page title',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Main page content',
      },
      metaTitle: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'SEO meta title',
      },
      metaDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'SEO meta description',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether this page is published and accessible',
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'User ID who created this page',
      },
      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'User ID who last updated this page',
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
    await queryInterface.addIndex('static_pages', ['slug'], {
      name: 'static_pages_slug_idx',
      unique: true,
    });

    await queryInterface.addIndex('static_pages', ['isActive'], {
      name: 'static_pages_is_active_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('static_pages');
  },
};
