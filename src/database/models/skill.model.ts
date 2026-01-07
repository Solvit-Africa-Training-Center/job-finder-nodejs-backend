import { DataTypes, Model, Sequelize } from 'sequelize';

interface SkillAttributes {
  id: string;
  name: string;
  category?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type SkillCreationAttributes = Omit<
  SkillAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {
  isActive?: boolean;
  category?: string;
};

export class Skill
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  id!: string;
  name!: string;
  category?: string;
  isActive!: boolean;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt?: Date;

  toJSON() {
    const values = { ...this.get() };
    delete values.deletedAt;
    return values;
  }
}

export const initSkillModel = (sequelize: Sequelize): typeof Skill => {
  Skill.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'skills',
      timestamps: true,
      paranoid: true,
    },
  );

  return Skill;
};
