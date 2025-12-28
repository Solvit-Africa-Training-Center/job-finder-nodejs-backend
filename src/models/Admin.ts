import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface AdminAttributes {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type AdminCreationAttributes = Optional<
  AdminAttributes,
  "id" | "isActive" | "lastLoginAt"
>;

class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  public id!: string;
  public email!: string;
  public password!: string;
  public isActive!: boolean;
  public lastLoginAt?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initAdmin = (sequelize: Sequelize) => {
  Admin.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "admins",
    }
  );
  return Admin;
};

export default Admin;
