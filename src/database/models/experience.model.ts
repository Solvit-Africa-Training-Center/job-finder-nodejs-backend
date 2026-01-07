import { DataTypes, Model, Sequelize } from 'sequelize';
import { EmploymentType } from './enums';

interface ExperienceAttributes {
  id: string;
  candidateProfileId: string;
  companyName: string;
  jobTitle: string;
  employmentType: EmploymentType;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description?: string;
  achievements?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ExperienceCreationAttributes = Omit<
  ExperienceAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {
  isCurrent?: boolean;
  endDate?: Date;
  location?: string;
  description?: string;
  achievements?: string;
};

export class Experience
  extends Model<ExperienceAttributes, ExperienceCreationAttributes>
  implements ExperienceAttributes
{
  id!: string;
  candidateProfileId!: string;
  companyName!: string;
  jobTitle!: string;
  employmentType!: EmploymentType;
  location?: string;
  startDate!: Date;
  endDate?: Date;
  isCurrent!: boolean;
  description?: string;
  achievements?: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt?: Date;

  toJSON() {
    const values = { ...this.get() };
    delete values.deletedAt;
    return values;
  }
}

export const initExperienceModel = (
  sequelize: Sequelize,
): typeof Experience => {
  Experience.init(
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
      companyName: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      employmentType: {
        type: DataTypes.ENUM(...Object.values(EmploymentType)),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(200),
        allowNull: true,
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      achievements: {
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
      tableName: 'experience',
      timestamps: true,
      paranoid: true,
    },
  );

  return Experience;
};
