import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'candidate' | 'recruiter' | 'admin';
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isEmailVerified' | 'isActive' | 'lastLogin'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public userType!: 'candidate' | 'recruiter' | 'admin';
  public isEmailVerified!: boolean;
  public isActive!: boolean;
  public lastLogin!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userType: {
    type: DataTypes.ENUM('candidate', 'recruiter', 'admin'),
    allowNull: false,
    defaultValue: 'candidate'
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
});

export default User;
