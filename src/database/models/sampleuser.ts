import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface SampleUserAttributes {
  id: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SampleUserCreationAttributes extends Optional<
  SampleUserAttributes,
  'id'
> {
  id?: string;
}

export class SampleUser
  extends Model<SampleUserAttributes, SampleUserCreationAttributes>
  implements SampleUserAttributes
{
  public id!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  association() {}
}

export const SampleUserModel = (sequelize: Sequelize) => {
  SampleUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'sampleuser',
      tableName: 'sampleusers',
    },
  );

  return SampleUser;
};
