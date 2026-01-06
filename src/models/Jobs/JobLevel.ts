import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { UUID } from 'node:crypto';

interface JobLevelAttributes {
  id: UUID;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobLevelCreationAttributes 
  extends Optional<JobLevelAttributes, 'id' | 'description' | 'displayOrder' | 'isActive' | 'deletedAt'> {}

class JobLevel extends Model<JobLevelAttributes, JobLevelCreationAttributes>
  implements JobLevelAttributes {
  public id!: UUID;
  public name!: string;
  public slug!: string;
  public description!: string | null;
  public displayOrder!: number;
  public isActive!: boolean;
  public deletedAt!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JobLevel.init(
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
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'job_levels',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'idx_job_levels_slug',
        unique: true,
        fields: ['slug'],
      },
      {
        name: 'idx_job_levels_display_order',
        fields: ['displayOrder'],
      },
      {
        name: 'idx_job_levels_active',
        fields: ['isActive'],
      },
    ],
  }
);

export default JobLevel;