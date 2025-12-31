'use strict';

import { Model, Sequelize, DataTypes, Optional } from 'sequelize';

interface JobTitleAttributes {
  id: string;
  name: string;
  description?: string;
  jobCategoryId: string;
  jobLevelId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface JobTitleCreationAttributes
  extends Optional<JobTitleAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class JobTitle
  extends Model<JobTitleAttributes, JobTitleCreationAttributes>
  implements JobTitleAttributes
{
  public id!: string;
  public name!: string;
  public description?: string;
  public jobCategoryId!: string;
  public jobLevelId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    JobTitle.belongsTo(models.JobCategory, {
      foreignKey: 'jobCategoryId',
      as: 'category',
    });

    JobTitle.belongsTo(models.JobLevel, {
      foreignKey: 'jobLevelId',
      as: 'level',
    });
  }
}

export default (sequelize: Sequelize) => {
  JobTitle.init(
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

      jobCategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      jobLevelId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'JobTitles',
      modelName: 'JobTitle',
      timestamps: true,
    }
  );

  return JobTitle;
};
