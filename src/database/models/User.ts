import { DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'CANDIDATE' | 'RECRUITER' | 'ADMIN';
  emailVerifiedAt?: Date | null;
  twoFactorEnabledId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  role!: 'CANDIDATE' | 'RECRUITER' | 'ADMIN';
  emailVerifiedAt!: Date | null;
  twoFactorEnabledId!: string | null;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt!: Date | null;
}

export const UserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
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
        unique: true,
      },
      role: {
        type: DataTypes.ENUM('CANDIDATE', 'RECRUITER', 'ADMIN'),
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { sequelize, tableName: 'users', paranoid: true },
  );
  return User;
};
