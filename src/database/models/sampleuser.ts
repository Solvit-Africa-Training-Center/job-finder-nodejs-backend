import bcrypt from 'bcrypt';
import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { UserProfile } from './userprofile.model';
import { UserActivityLog } from './useractivitylog.model';

const BCRYPT_ROUNDS = 10;

interface SampleUserAttributes {
  id: number;
  email: string;
  password: string;

  role: 'admin' | 'recruiter' | 'candidate';
  isActive: boolean;
  isBlocked: boolean;

  blockedAt?: Date | null;
  failedLoginAttempts: number;
  lastLoginAt?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}

type SampleUserCreationAttributes = Optional<
  SampleUserAttributes,
  | 'id'
  | 'role'
  | 'isActive'
  | 'isBlocked'
  | 'blockedAt'
  | 'failedLoginAttempts'
  | 'lastLoginAt'
>;

export class SampleUser
  extends Model<SampleUserAttributes, SampleUserCreationAttributes>
  implements SampleUserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;

  public role!: 'admin' | 'recruiter' | 'candidate';
  public isActive!: boolean;
  public isBlocked!: boolean;

  public blockedAt!: Date | null;
  public failedLoginAttempts!: number;
  public lastLoginAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  declare profile?: UserProfile;
  declare activityLogs?: UserActivityLog[];
  declare adminActivityLogs?: UserActivityLog[];

  static associate(models: Record<string, any>) {
    SampleUser.hasOne(models.UserProfile, {
      foreignKey: 'userId',
      as: 'profile',
    });

    SampleUser.hasMany(models.UserActivityLog, {
      foreignKey: 'userId',
      as: 'activityLogs',
    });

    SampleUser.hasMany(models.UserActivityLog, {
      foreignKey: 'adminId',
      as: 'adminActivityLogs',
    });
  }
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
        type: DataTypes.ENUM('admin', 'recruiter', 'candidate'),
        allowNull: false,
        defaultValue: 'candidate',
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

      blockedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      failedLoginAttempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'SampleUser',
      tableName: 'sampleusers',
      timestamps: true,
    },
  );

  SampleUser.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
  });

  SampleUser.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
    }
  });

  return SampleUser;
};
