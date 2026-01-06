import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { UUID } from 'node:crypto';

interface JobTitleAttributes {
  id: UUID;
  title: string;
  slug: string;
  categoryId: number | null;
  subCategoryId: number | null;
  isActive: boolean;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobTitleCreationAttributes 
  extends Optional<JobTitleAttributes, 'id' | 'categoryId' | 'subCategoryId' | 'isActive' | 'deletedAt'> {}

class JobTitle extends Model<JobTitleAttributes, JobTitleCreationAttributes>
  implements JobTitleAttributes {
  public id!: UUID;
  public title!: string;
  public slug!: string;
  public categoryId!: number | null;
  public subCategoryId!: number | null;
  public isActive!: boolean;
  public deletedAt!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JobTitle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Links to YOUR job_categories table only
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Links to YOUR job_sub_categories table only
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'job_titles',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'idx_job_titles_slug',
        unique: true,
        fields: ['slug'],
      },
      {
        name: 'idx_job_titles_category_id',
        fields: ['categoryId'],
      },
      {
        name: 'idx_job_titles_sub_category_id',
        fields: ['subCategoryId'],
      },
      {
        name: 'idx_job_titles_active',
        fields: ['isActive'],
      },
    ],
  }
);

export default JobTitle;