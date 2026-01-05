import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('files', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      originalName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      storedName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      publicId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      fileUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      isPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      context: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // timestamps
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    // Optional but RECOMMENDED indexes
    await queryInterface.addIndex('files', ['userId']);
    await queryInterface.addIndex('files', ['context']);
    await queryInterface.addIndex('files', ['isPrimary']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('files');
  },
};
