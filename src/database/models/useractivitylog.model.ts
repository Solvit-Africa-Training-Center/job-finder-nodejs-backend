import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface UserActivityLogAttributes {
  id: number;
  userId: number;
  adminId: number;
  action:
    | 'activate'
    | 'deactivate'
    | 'block'
    | 'unblock'
    | 'role_change'
    | 'account_update'
    | 'profile_update';
  details?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserActivityLogCreationAttributes extends Optional<
  UserActivityLogAttributes,
  'id'
> {
  id?: number;
}

export class UserActivityLog
  extends Model<UserActivityLogAttributes, UserActivityLogCreationAttributes>
  implements UserActivityLogAttributes
{
  public id!: number;
  public userId!: number;
  public adminId!: number;
  public action!:
    | 'activate'
    | 'deactivate'
    | 'block'
    | 'unblock'
    | 'role_change'
    | 'account_update'
    | 'profile_update';
  public details?: Record<string, unknown>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: Record<string, unknown>) {
    UserActivityLog.belongsTo(models.SampleUser as any, {
      foreignKey: 'userId',
      as: 'user',
    });

    UserActivityLog.belongsTo(models.SampleUser as any, {
      foreignKey: 'adminId',
      as: 'admin',
    });
  }
}

export const initUserActivityLogModel = (sequelize: Sequelize) => {
  UserActivityLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sampleusers',
          key: 'id',
        },
      },

      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sampleusers',
          key: 'id',
        },
      },

      action: {
        type: DataTypes.ENUM(
          'activate',
          'deactivate',
          'block',
          'unblock',
          'role_change',
          'account_update',
          'profile_update',
        ),
        allowNull: false,
      },

      details: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'useractivitylog',
      tableName: 'useractivitylogs',
      timestamps: true,
    },
  );

  return UserActivityLog;
};
