import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

/**
 * Attributes in DB
 */
export interface JobApprovalAttributes {
  id: string;
  job_id: string;
  admin_id: string;
  status: 'Approved' | 'Rejected' | 'Pending';
  notes?: string;
  reviewed_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

type JobApprovalCreationAttributes = Optional<
  JobApprovalAttributes,
  'id' | 'notes' | 'reviewed_at' | 'created_at' | 'updated_at'
>;

class JobApproval
  extends Model<JobApprovalAttributes, JobApprovalCreationAttributes>
  implements JobApprovalAttributes
{
  public id!: string;
  public job_id!: string;
  public admin_id!: string;
  public status!: 'Approved' | 'Rejected' | 'Pending';
  public notes?: string;
  public reviewed_at?: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models: any) {
    JobApproval.belongsTo(models.Job, {
      foreignKey: 'job_id',
      as: 'job'
    });

    JobApproval.belongsTo(models.User, {
      foreignKey: 'admin_id',
      as: 'admin'
    });
  }

  /**
   * Model initializer
   */
  static initModel(sequelize: Sequelize): typeof JobApproval {
    JobApproval.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },

        job_id: {
          type: DataTypes.UUID,
          allowNull: false
        },

        admin_id: {
          type: DataTypes.UUID,
          allowNull: false
        },

        status: {
          type: DataTypes.ENUM('Approved', 'Rejected', 'Pending'),
          allowNull: false,
          defaultValue: 'Pending'
        },

        notes: {
          type: DataTypes.TEXT,
          allowNull: true
        },

        reviewed_at: {
          type: DataTypes.DATE,
          allowNull: true
        }
      },
      {
        sequelize,
        modelName: 'JobApproval',
        tableName: 'job_approvals',
        timestamps: true,
        underscored: true
      }
    );

    return JobApproval;
  }
}

export default JobApproval;
