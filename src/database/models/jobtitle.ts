'use strict';

import { Model, Sequelize, DataTypes, Optional } from 'sequelize';

interface JobTitleAttributes {
  id?: number;
  name: string;
  description?: string;
}

interface JobTitleCreationAttributes
  extends Optional<JobTitleAttributes, 'id'> {}

export default (
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) => {
  class JobTitle
    extends Model<JobTitleAttributes, JobTitleCreationAttributes>
    implements JobTitleAttributes
  {
    public id!: number;
    public name!: string;
    public description?: string;

    static associate(models: any) {
      // define association here
    }
  }

  JobTitle.init(
    {
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: dataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'JobTitle',
      tableName: 'JobTitles',
      timestamps: true,
    }
  );

  return JobTitle;
};
