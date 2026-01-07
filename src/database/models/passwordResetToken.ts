import { DataTypes, Model, Sequelize } from 'sequelize';

export interface passwordResetTokenAttributes {
  id?: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}

export class PasswordResetToken
  extends Model<passwordResetTokenAttributes>
  implements passwordResetTokenAttributes
{
  id!: string;
  userId!: string;
  token!: string;
  expiresAt!: Date;

  readonly createdAt!: Date;
}

export const initPasswordResetTokenModel = (
  sequelize: Sequelize,
): typeof PasswordResetToken => {
  PasswordResetToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'passwordresettoken',
    },
  );

  return PasswordResetToken;
};
