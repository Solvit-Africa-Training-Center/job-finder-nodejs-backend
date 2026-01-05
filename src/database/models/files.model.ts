import {
  DataTypes,
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class File extends Model<
  InferAttributes<File, { omit: 'createdAt' | 'updatedAt' | 'deletedAt' }>,
  InferCreationAttributes<
    File,
    { omit: 'createdAt' | 'updatedAt' | 'deletedAt' }
  >
> {
  declare id: CreationOptional<string>;
  declare userId: string;

  // File identity
  declare originalName: string;
  declare storedName: string;

  // Cloudinary
  declare publicId: string;
  declare fileUrl: string;

  // Metadata
  declare mimeType: string;
  declare fileSize: number;

  // Versioning
  declare version: number;
  declare isPrimary: CreationOptional<boolean>;
  declare isActive: CreationOptional<boolean>;

  // Usage context
  declare context: string;

  // timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

export const initFileModel = (sequelize: Sequelize): typeof File => {
  File.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
        defaultValue: true,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      context: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'files',
      timestamps: true,
      paranoid: true,
    },
  );

  return File;
};
