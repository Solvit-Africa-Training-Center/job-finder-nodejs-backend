'use strict';

import { Model, Sequelize, DataTypes, Optional } from 'sequelize';

interface JobLevelAttributes {
  id?: number;
  name: string;
  order?: number;
  description?: string;
}

interface JobLevelCreationAttributes
  extends Optional<JobLevelAttributes, 'id'> {}

export default (
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) => {
  class JobLevel
    extends Model<JobLevelAttributes, JobLevelCreationAttributes>
    implements JobLevelAttributes
  {
    public id!: number;
    public name!: string;
    public order?: number;
    public description?: string;

    static associate(models: any) {
      // define association here
    }
  }

  JobLevel.init(
    {
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: dataTypes.INTEGER,
      },
      description: {
        type: dataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'JobLevel',
      tableName: 'JobLevels',
      timestamps: true,
    }
  );

  return JobLevel;
};
