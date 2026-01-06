import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { UUID } from 'node:crypto';

interface JobSubCategoryAttributes {
  id: UUID;
  categoryId: number; 
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  displayOrder: number;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobSubCategoryCreationAttributes 
  extends Optional<JobSubCategoryAttributes, 'id' | 'description' | 'isActive' | 'displayOrder' | 'deletedAt'> {}

class JobSubCategory extends Model<JobSubCategoryAttributes, JobSubCategoryCreationAttributes>
  implements JobSubCategoryAttributes {
  public id!: UUID;
  public categoryId!: number;
  public name!: string;
  public slug!: string;
  public description!: string | null;
  public isActive!: boolean;
  public displayOrder!: number;
  public deletedAt!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JobSubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // NO FOREIGN KEY - just stores category ID
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
    tableName: 'job_sub_categories',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'idx_job_sub_categories_category_id',
        fields: ['categoryId'],
      },
      {
        name: 'idx_job_sub_categories_slug',
        unique: true,
        fields: ['slug'],
      },
      {
        name: 'idx_job_sub_categories_active',
        fields: ['isActive'],
      },
    ],
  }
);

export default JobSubCategory;