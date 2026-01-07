import { DataTypes, Model, Sequelize } from 'sequelize';

export interface emailVerificationTokenAttributes {
  id?: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
}

export class EmailVerificationToken
  extends Model<emailVerificationTokenAttributes>
  implements emailVerificationTokenAttributes
{
  id!: string;
  userId!: string;
  token!: string;
  expiresAt!: Date;

  readonly createdAt!: Date;
}

export const initEmailVerficationTokenModel = (
  sequelize: Sequelize,
): typeof EmailVerificationToken => {
  EmailVerificationToken.init(
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
      tableName: 'emailverificationstoken',
    },
  );

  return EmailVerificationToken;
};
