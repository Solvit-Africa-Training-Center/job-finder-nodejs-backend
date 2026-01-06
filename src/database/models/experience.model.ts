import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface ExperienceAttributes {
  id: string;
  candidateProfileId: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrentlyWorking: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Experience
  extends Model<
    ExperienceAttributes,
    Optional<
      ExperienceAttributes,
      'id' | 'location' | 'endDate' | 'description'
    >
  >
  implements ExperienceAttributes
{
  public id!: string;
  public candidateProfileId!: string;
  public jobTitle!: string;
  public company!: string;
  public location?: string;
  public startDate!: Date;
  public endDate?: Date;
  public isCurrentlyWorking!: boolean;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  association() {}
}

export const initExperienceModel = (sequelize: Sequelize) => {
  Experience.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      candidateProfileId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isCurrentlyWorking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'experiences',
      timestamps: true,
    },
  );

  return Experience;
};
