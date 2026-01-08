import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface UserProfileAttributes {
  id: number;
  userId: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  profilePicture?: string;
  completionPercentage: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserProfileCreationAttributes extends Optional<
  UserProfileAttributes,
  'id' | 'completionPercentage'
> {
  id?: number;
}

export class UserProfile
  extends Model<UserProfileAttributes, UserProfileCreationAttributes>
  implements UserProfileAttributes
{
  public id!: number;
  public userId!: number;
  public firstName?: string;
  public lastName?: string;
  public username?: string;
  public profilePicture?: string;
  public completionPercentage!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: Record<string, unknown>) {
    UserProfile.belongsTo(models.SampleUser as any, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export const initUserProfileModel = (sequelize: Sequelize) => {
  UserProfile.init(
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

      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      completionPercentage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
    },
    {
      sequelize,
      modelName: 'userprofile',
      tableName: 'userprofiles',
      timestamps: true,
    },
  );

  return UserProfile;
};
