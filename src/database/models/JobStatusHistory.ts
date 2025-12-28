import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

/**
 * Attributes in DB
 */
export interface JobStatusHistoryAttributes {
  id: string;
  job_id: string;
  old_status: string;
  new_status: string;
  changed_by: string;
  notes?: string;
  changed_at: Date;
}

/**
 * Attributes allowed on creation
 */
type JobStatusHistoryCreationAttributes = Optional<
  JobStatusHistoryAttributes,
  'id' | 'notes' | 'changed_at'
>;

class JobStatusHistory
  extends Model<
    JobStatusHistoryAttributes,
    JobStatusHistoryCreationAttributes
  >
  implements JobStatusHistoryAttributes
{
  public id!: string;
  public job_id!: string;
  public old_status!: string;
  public new_status!: string;
  public changed_by!: string;
  public notes?: string;
  public changed_at!: Date;

  static associate(models: any) {
    JobStatusHistory.belongsTo(models.Job, {
      foreignKey: 'job_id',
      as: 'job'
    });

    JobStatusHistory.belongsTo(models.User, {
      foreignKey: 'changed_by',
      as: 'changedBy'
    });
  }

  /**
   * Initialize model
   */
  static initModel(sequelize: Sequelize): typeof JobStatusHistory {
    JobStatusHistory.init(
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

        old_status: {
          type: DataTypes.STRING,
          allowNull: false
        },

        new_status: {
          type: DataTypes.STRING,
          allowNull: false
        },

        changed_by: {
          type: DataTypes.UUID,
          allowNull: false
        },

        notes: {
          type: DataTypes.TEXT,
          allowNull: true
        },

        changed_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
      },
      {
        sequelize,
        modelName: 'JobStatusHistory',
        tableName: 'job_status_history',
        timestamps: false,
        underscored: true
      }
    );

    return JobStatusHistory;
  }
}

export default JobStatusHistory;