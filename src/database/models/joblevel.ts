'use strict';

import { Model, Sequelize, DataTypes, Optional } from 'sequelize';

interface JobLevelAttributes {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface JobLevelCreationAttributes
  extends Optional<JobLevelAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class JobLevel
  extends Model<JobLevelAttributes, JobLevelCreationAttributes>
  implements JobLevelAttributes
{
  public id!: string;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    JobLevel.hasMany(models.JobTitle, {
      foreignKey: 'jobLevelId',
      as: 'jobTitles',
    });
  }
}

export default (sequelize: Sequelize) => {
  JobLevel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      tableName: 'JobLevels',
      modelName: 'JobLevel',
      timestamps: true,
    }
  );

  return JobLevel;
};
