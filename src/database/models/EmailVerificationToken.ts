import { DataTypes, Model, Sequelize } from 'sequelize';

export interface EmailVerificationTokenAttributes {
  id?: string;
  token: string;
  userId: string;
  createdAt?: Date;
}

export class EmailVerificationToken
  extends Model<EmailVerificationTokenAttributes>
  implements EmailVerificationTokenAttributes
{
  id!: string;
  token!: string;
  userId!: string;
  readonly createdAt!: Date;
}

export const initEmailVerificationTokenModel = (
  sequelize: Sequelize,
): typeof EmailVerificationToken => {
  EmailVerificationToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'emailverificationstoken',
      tableName: 'emailverificationstoken',
    },
  );

  return EmailVerificationToken;
};
