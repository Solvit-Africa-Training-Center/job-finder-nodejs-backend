import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface SkillAttributes {
  id: string;
  name: string;
  description?: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Skill
  extends Model<
    SkillAttributes,
    Optional<SkillAttributes, 'id' | 'description' | 'category'>
  >
  implements SkillAttributes
{
  public id!: string;
  public name!: string;
  public description?: string;
  public category?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  association() {}
}

export const initSkillModel = (sequelize: Sequelize) => {
  Skill.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'skills',
      timestamps: true,
    },
  );

  return Skill;
};
