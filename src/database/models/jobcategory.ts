'use strict';

import { Model, Sequelize, DataTypes, Optional } from 'sequelize';

interface JobCategoryAttributes {
  id?: number;
  name: string;
  description?: string;
  parentId?: number;
}

interface JobCategoryCreationAttributes
  extends Optional<JobCategoryAttributes, 'id'> {}

  export class JobCategory
    extends Model<JobCategoryAttributes, JobCategoryCreationAttributes>
    implements JobCategoryAttributes
  {
    public id!: number;
    public name!: string;
    public description?: string;
    public parentId?: number;

    static associate(models: any) {
      // define association here
    }
  }

export default (
  sequelize: Sequelize,
  //dataTypes: typeof DataTypes
) => {
  

  JobCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      parentId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'JobCategory',
      tableName: 'JobCategories',
      timestamps: true,
    }
  );

  return JobCategory;
};
