import { Model, DataTypes, Optional, Sequelize } from "sequelize";

/**
 * Attributes of SampleUser
 */
interface SampleUserAttributes {
  id: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Attributes required when creating a new record
 * (id is optional because it is auto-generated)
 */
interface SampleUserCreationAttributes
  extends Optional<SampleUserAttributes, "id"> {}

/**
 * SampleUser model class
 */
export class SampleUser
  extends Model<SampleUserAttributes, SampleUserCreationAttributes>
  implements SampleUserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Associations
   */
  static associate(models: any) {
    // define associations here
  }
}

/**
 * Initialize model
 */
export default (sequelize: Sequelize) => {
  SampleUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "sampleuser",
      tableName: "sampleusers", // adjust if necessary
    }
  );

  return SampleUser;
};
