import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

interface RefreshTokenAttributes {
  id: number;
  token: string;
  userId: number;
  expiresAt: Date;
  isRevoked: boolean;
}

class RefreshToken extends Model<RefreshTokenAttributes> implements RefreshTokenAttributes {
  public id!: number;
  public token!: string;
  public userId!: number;
  public expiresAt!: Date;
  public isRevoked!: boolean;
}

RefreshToken.init({
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
  isRevoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  tableName: 'refresh_tokens',
  timestamps: true
});

export default RefreshToken;
