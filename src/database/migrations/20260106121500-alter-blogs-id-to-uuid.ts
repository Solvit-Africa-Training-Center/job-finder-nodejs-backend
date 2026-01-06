import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    // Change id column to UUID
    await queryInterface.changeColumn('blogs', 'id', {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    // Revert id column to INTEGER (if needed)
    await queryInterface.changeColumn('blogs', 'id', {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    });
  },
};
