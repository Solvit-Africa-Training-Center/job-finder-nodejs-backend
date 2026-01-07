import { DataTypes, Model, Sequelize } from 'sequelize';

interface SavedJobAttributes {
  id: string;
  candidateProfileId: string;
  jobId: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SavedJobCreationAttributes = Omit<
  SavedJobAttributes,
  'id' | 'createdAt' | 'updatedAt'
> & {
  notes?: string;
};

export class SavedJob
  extends Model<SavedJobAttributes, SavedJobCreationAttributes>
  implements SavedJobAttributes
{
  id!: string;
  candidateProfileId!: string;
  jobId!: string;
  notes?: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const initSavedJobModel = (sequelize: Sequelize): typeof SavedJob => {
  SavedJob.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      candidateProfileId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'candidate_profiles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      jobId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'jobs',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'saved_jobs',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['candidateProfileId', 'jobId'],
        },
      ],
    },
  );

  return SavedJob;
};
