import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface JobAttributes {
  id: string;
  title: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  location: string;
  is_remote: boolean;
  experience_level: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  recruiter_id: string;
  category_id: string;
  status: 'Pending' | 'Active' | 'Closed' | 'Rejected';
  is_featured: boolean;
  expires_at: Date;
  published_at?: Date;
  views_count: number;
  applications_count: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface JobCreationAttributes extends Optional<JobAttributes, 
  'id' | 'status' | 'is_featured' | 'views_count' | 'applications_count' | 'created_at' | 'updated_at' | 'deleted_at'
> {}

class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public requirements!: string;
  public responsibilities!: string;
  public salary_min!: number;
  public salary_max!: number;
  public salary_currency!: string;
  public employment_type!: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  public location!: string;
  public is_remote!: boolean;
  public experience_level!: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  public recruiter_id!: string;
  public category_id!: string;
  public status!: 'Pending' | 'Active' | 'Closed' | 'Rejected';
  public is_featured!: boolean;
  public expires_at!: Date;
  public published_at!: Date;
  public views_count!: number;
  public applications_count!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any) {
    if (models.User) {
      Job.belongsTo(models.User, { foreignKey: 'recruiter_id', as: 'recruiter' });
    }
    if (models.JobCategory) {
      Job.belongsTo(models.JobCategory, { foreignKey: 'category_id', as: 'category' });
    }
    if (models.JobView) {
      Job.hasMany(models.JobView, { foreignKey: 'job_id', as: 'views' });
    }
    if (models.JobApproval) {
      Job.hasMany(models.JobApproval, { foreignKey: 'job_id', as: 'approvals' });
    }
    if (models.JobStatusHistory) {
      Job.hasMany(models.JobStatusHistory, { foreignKey: 'job_id', as: 'statusHistory' });
    }
  }
}

export const initJobModel = (sequelize: Sequelize) => {
  Job.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { len: [5, 200] },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      requirements: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      responsibilities: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      salary_min: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      salary_max: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      salary_currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'USD',
      },
      employment_type: {
        type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Freelance'),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_remote: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      experience_level: {
        type: DataTypes.ENUM('Entry', 'Mid', 'Senior', 'Lead'),
        allowNull: false,
      },
      recruiter_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Active', 'Closed', 'Rejected'),
        defaultValue: 'Pending',
      },
      is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      views_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      applications_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Job',
      tableName: 'jobs',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return Job;
};

export default Job;