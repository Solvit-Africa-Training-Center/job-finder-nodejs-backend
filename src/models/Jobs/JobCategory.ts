import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database/sequelize';

interface JobCategoryAttributes {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  isActive: boolean;
  displayOrder: number;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobCategoryCreationAttributes 
  extends Optional<JobCategoryAttributes, 'id' | 'description' | 'icon' | 'isActive' | 'displayOrder' | 'deletedAt'> {}

class JobCategory extends Model<JobCategoryAttributes, JobCategoryCreationAttributes>
  implements JobCategoryAttributes {
  public id!: number;
  public name!: string;
  public slug!: string;
  public description!: string | null;
  public icon!: string | null;
  public isActive!: boolean;
  public displayOrder!: number;
  public deletedAt!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JobCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    displayOrder: {
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
    tableName: 'job_categories',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'idx_job_categories_slug',
        unique: true,
        fields: ['slug'],
      },
      {
        name: 'idx_job_categories_active',
        fields: ['isActive'],
      },
      {
        name: 'idx_job_categories_display_order',
        fields: ['displayOrder'],
      },
    ],
  }
);

export default JobCategory;