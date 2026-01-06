import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    // Drop the old comments table if it exists
    await queryInterface.dropTable('comments');
    // Recreate with correct posted_date column
    await queryInterface.createTable('comments', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      posted_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blog_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'blogs',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('comments');
  },
};
