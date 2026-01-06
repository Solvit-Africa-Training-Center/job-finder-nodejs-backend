import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    // Drop the old likes table if it exists
    await queryInterface.dropTable('likes');
    // Recreate with correct blog_id UUID foreign key
    await queryInterface.createTable('likes', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
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
    await queryInterface.dropTable('likes');
  },
};
