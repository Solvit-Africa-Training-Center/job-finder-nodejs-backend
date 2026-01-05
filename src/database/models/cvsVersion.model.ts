import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface CVVersionAttributes {
  id: string;
  cvId: string;
  publicId: string;
  secureUrl: string;
  versionNumber: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

type CVVersionCreationAttributes = Optional<CVVersionAttributes, 'id'>;

export class CVVersion
  extends Model<CVVersionAttributes, CVVersionCreationAttributes>
  implements CVVersionAttributes
{
  id!: string;
  cvId!: string;
  publicId!: string;
  secureUrl!: string;
  versionNumber!: number;
  fileName!: string;
  fileSize!: number;
  mimeType!: string;

  // Sequelize-managed timestamps
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const initCVVersionModel = (sequelize: Sequelize): typeof CVVersion => {
  CVVersion.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      cvId: {
        type: DataTypes.UUID,
        allowNull: false,
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
    },
    {
      sequelize,
      tableName: 'cv_versions',
      timestamps: true,
    },
  );

  return CVVersion;
};
