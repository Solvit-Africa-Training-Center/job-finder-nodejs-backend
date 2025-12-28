// src/database/models/JobView.ts
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface JobViewAttributes {
  id: string;
  job_id: string;
  user_id?: string;
  ip_address: string;
  user_agent?: string;
  viewed_at: Date;
}

/**
 * Optional fields when creating
 */
interface JobViewCreationAttributes
  extends Optional<JobViewAttributes, 'id' | 'user_id' | 'user_agent' | 'viewed_at'> {}

export const JobViewInit = (sequelize: Sequelize) => {
  class JobView
    extends Model<JobViewAttributes, JobViewCreationAttributes>
    implements JobViewAttributes
  {
    public id!: string;
    public job_id!: string;
    public user_id?: string;
    public ip_address!: string;
    public user_agent?: string;
    public viewed_at!: Date;

    static associate(models: any) {
      JobView.belongsTo(models.Job, {
        foreignKey: 'job_id',
        as: 'job',
      });

    //   JobView.belongsTo(models.User, {
    //     foreignKey: 'user_id',
    //     as: 'user',
    //   });
    }
  }

  JobView.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      job_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIP: true, // Ensures the field contains a valid IP address
        },
      },
      user_agent: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      viewed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'JobView',
      tableName: 'job_views',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ['job_id'], // Index for job_id
        },
        {
          fields: ['user_id'], // Index for user_id (optional)
        },
      ],
    }
  );

  return JobView;
};