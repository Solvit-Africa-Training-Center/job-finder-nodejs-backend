import { DataTypes, Model, Sequelize } from 'sequelize';

interface EducationAttributes {
  id: string;
  candidateProfileId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  grade?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type EducationCreationAttributes = Omit<
  EducationAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {
  isCurrent?: boolean;
  endDate?: Date;
  grade?: string;
  description?: string;
};

export class Education
  extends Model<EducationAttributes, EducationCreationAttributes>
  implements EducationAttributes
{
  id!: string;
  candidateProfileId!: string;
  institution!: string;
  degree!: string;
  fieldOfStudy!: string;
  startDate!: Date;
  endDate?: Date;
  isCurrent!: boolean;
  grade?: string;
  description?: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt?: Date;

  toJSON() {
    const values = { ...this.get() };
    delete values.deletedAt;
    return values;
  }
}

export const initEducationModel = (sequelize: Sequelize): typeof Education => {
  Education.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      candidateProfileId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'candidate_profiles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      institution: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      degree: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      fieldOfStudy: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      isCurrent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      grade: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
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
    },
    {
      sequelize,
      tableName: 'education',
      timestamps: true,
      paranoid: true,
    },
  );

  return Education;
};
