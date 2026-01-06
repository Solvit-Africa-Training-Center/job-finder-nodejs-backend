import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface SampleUserAttributes {
  id: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  isActive: boolean;
  isBlocked: boolean;
  failedLoginAttempts: number;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  blockedAt?:Date;
}

interface SampleUserCreationAttributes extends Optional<
  SampleUserAttributes,
  'id' | 'isActive' | 'isBlocked' | 'failedLoginAttempts' | 'lastLoginAt' | 'blockedAt'
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
  public role!: 'ADMIN' | 'USER';
  public isActive!: boolean;
  public isBlocked!: boolean;
  public failedLoginAttempts!: number;
  public lastLoginAt?: Date;
  public blockedAt?: Date;
  

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
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('ADMIN','USER'),
        allowNull: false,
        defaultValue: 'USER',

      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }, 
      isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,

      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      failedLoginAttempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      blockedAt: {
        type: DataTypes.DATE,
        allowNull: true,
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
