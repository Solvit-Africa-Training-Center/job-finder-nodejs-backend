import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

interface RoleAttributes {
  id: number;
  name: string;
  description: string;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'roles',
  timestamps: true
});

export default Role;
