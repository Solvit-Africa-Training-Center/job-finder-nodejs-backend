'use strict';

import { Model, Sequelize, DataTypes, Optional } from 'sequelize';

interface JobCategoryAttributes {
  id: string;
  name: string;
  industry?: string;
  description?: string;
  parentId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface JobCategoryCreationAttributes
  extends Optional<
    JobCategoryAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

export class JobCategory
  extends Model<JobCategoryAttributes, JobCategoryCreationAttributes>
  implements JobCategoryAttributes
{
  public id!: string;
  public name!: string;
  public industry?: string;
  public description?: string;
  public parentId?: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static associate(models: any) {
    

    JobCategory.belongsTo(models.JobCategory, {
      foreignKey: 'parentId',
      as: 'parent',
    });

    JobCategory.hasMany(models.JobCategory, {
      foreignKey: 'parentId',
      as: 'children',
    });
  }
}

export default (sequelize: Sequelize) => {
  JobCategory.init(
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

      industry: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'JobCategories',
      modelName: 'JobCategory',
      timestamps: true,
      paranoid: true, // enables deletedAt if your migration has it
    }
  );

  return JobCategory;
};
