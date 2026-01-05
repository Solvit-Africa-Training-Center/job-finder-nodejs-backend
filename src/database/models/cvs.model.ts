import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface CVAttributes {
  id: string;
  userId: number;
  currentVersionId?: string | null;
}

type CVCreationAttributes = Optional<CVAttributes, 'id' | 'currentVersionId'>;

export class CV
  extends Model<CVAttributes, CVCreationAttributes>
  implements CVAttributes
{
  id!: string;
  userId!: number;
  currentVersionId?: string | null;

  // Sequelize-managed timestamps
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt?: Date;
}

export const initCVModel = (sequelize: Sequelize): typeof CV => {
  CV.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currentVersionId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'cvs',
      timestamps: true,
      paranoid: true,
    },
  );

  return CV;
};
