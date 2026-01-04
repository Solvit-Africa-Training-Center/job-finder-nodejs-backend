import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

interface PasswordResetTokenAttributes {
  id: number;
  token: string;
  userId: number;
  expiresAt: Date;
  isUsed: boolean;
}

class PasswordResetToken extends Model<PasswordResetTokenAttributes> implements PasswordResetTokenAttributes {
  public id!: number;
  public token!: string;
  public userId!: number;
  public expiresAt!: Date;
  public isUsed!: boolean;
}

PasswordResetToken.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  tableName: 'password_reset_tokens',
  timestamps: true
});

export default PasswordResetToken;
