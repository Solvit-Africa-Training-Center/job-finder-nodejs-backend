import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('cv_versions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cvId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cvs',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secureUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    versionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('cv_versions');
}
