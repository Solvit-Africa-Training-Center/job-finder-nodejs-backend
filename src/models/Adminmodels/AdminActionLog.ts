import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database/sequelize';

interface AdminActionLogAttributes {
  id: number;
  adminId: number; 
  action: string;
  entityType: string;
  entityId: number | null;
  oldValues: object | null;
  newValues: object | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AdminActionLogCreationAttributes 
  extends Optional<AdminActionLogAttributes, 'id' | 'entityId' | 'oldValues' | 'newValues' | 'ipAddress' | 'userAgent'> {}

class AdminActionLog extends Model<AdminActionLogAttributes, AdminActionLogCreationAttributes>
  implements AdminActionLogAttributes {
  public id!: number;
  public adminId!: number;
  public action!: string;
  public entityType!: string;
  public entityId!: number | null;
  public oldValues!: object | null;
  public newValues!: object | null;
  public ipAddress!: string | null;
  public userAgent!: string | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AdminActionLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // NO REFERENCES - just stores the ID as a number
    },
    action: {
      type: DataTypes.ENUM(
        'CREATE',
        'UPDATE',
        'DELETE',
        'ACTIVATE',
        'DEACTIVATE',
        'APPROVE',
        'REJECT'
      ),
      allowNull: false,
    },
    entityType: {
      type: DataTypes.ENUM(
        'job_category',
        'job_sub_category',
        'job_title',
        'job_level',
        'faq',
        'static_page',
        'cv_template',
        'email_template'
      ),
      allowNull: false,
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    oldValues: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Previous state before update',
    },
    newValues: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'New state after update',
    },
    ipAddress: {
      type: DataTypes.INET,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'admin_action_logs',
    timestamps: true,
    indexes: [
      {
        name: 'idx_admin_action_logs_admin_id',
        fields: ['adminId'],
      },
      {
        name: 'idx_admin_action_logs_entity',
        fields: ['entityType', 'entityId'],
      },
      {
        name: 'idx_admin_action_logs_created_at',
        fields: ['createdAt'],
      },
    ],
  }
);

export default AdminActionLog;