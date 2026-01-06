import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface EducationAttributes {
  id: string;
  candidateProfileId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  isCurrentlyStudying: boolean;
  grade?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Education
  extends Model<
    EducationAttributes,
    Optional<EducationAttributes, 'id' | 'endDate' | 'grade' | 'description'>
  >
  implements EducationAttributes
{
  public id!: string;
  public candidateProfileId!: string;
  public institution!: string;
  public degree!: string;
  public fieldOfStudy!: string;
  public startDate!: Date;
  public endDate?: Date;
  public isCurrentlyStudying!: boolean;
  public grade?: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  association() {}
}

export const initEducationModel = (sequelize: Sequelize) => {
  Education.init(
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
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fieldOfStudy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isCurrentlyStudying: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'educations',
      timestamps: true,
    },
  );

  return Education;
};
