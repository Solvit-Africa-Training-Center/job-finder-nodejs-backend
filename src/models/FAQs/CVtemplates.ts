import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { UUID } from 'node:crypto';

interface CVTemplateAttributes {
  id: UUID;
  name: string;
  description: string | null;
  templateContent: string;
  thumbnailUrl: string | null;
  isActive: boolean;
  isPremium: boolean;
  usageCount: number;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CVTemplateCreationAttributes 
  extends Optional<CVTemplateAttributes, 'id' | 'description' | 'thumbnailUrl' | 'isActive' | 'isPremium' | 'usageCount' | 'deletedAt'> {}

class CVTemplate extends Model<CVTemplateAttributes, CVTemplateCreationAttributes>
  implements CVTemplateAttributes {
  public id!:UUID;
  public name!: string;
  public description!: string | null;
  public templateContent!: string;
  public thumbnailUrl!: string | null;
  public isActive!: boolean;
  public isPremium!: boolean;
  public usageCount!: number;
  public deletedAt!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CVTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    templateContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    usageCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'cv_templates',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'idx_cv_templates_active',
        fields: ['isActive'],
      },
      {
        name: 'idx_cv_templates_premium',
        fields: ['isPremium'],
      },
    ],
  }
);

export default CVTemplate;