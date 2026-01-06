import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface SavedJobAttributes {
  id: string;
  candidateProfileId: string;
  jobId: string;
  isPinned: boolean;
  appliedDate?: Date;
  applicationStatus:
    | 'not_applied'
    | 'applied'
    | 'rejected'
    | 'accepted'
    | 'offer_received';
  createdAt?: Date;
  updatedAt?: Date;
}

export class SavedJob
  extends Model<
    SavedJobAttributes,
    Optional<
      SavedJobAttributes,
      'id' | 'appliedDate' | 'isPinned' | 'applicationStatus'
    >
  >
  implements SavedJobAttributes
{
  public id!: string;
  public candidateProfileId!: string;
  public jobId!: string;
  public isPinned!: boolean;
  public appliedDate?: Date;
  public applicationStatus!:
    | 'not_applied'
    | 'applied'
    | 'rejected'
    | 'accepted'
    | 'offer_received';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  association() {}
}

export const initSavedJobModel = (sequelize: Sequelize) => {
  SavedJob.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      candidateProfileId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      jobId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      isPinned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      appliedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      applicationStatus: {
        type: DataTypes.ENUM(
          'not_applied',
          'applied',
          'rejected',
          'accepted',
          'offer_received',
        ),
        allowNull: false,
        defaultValue: 'not_applied',
      },
    },
    {
      sequelize,
      tableName: 'saved_jobs',
      timestamps: true,
    },
  );

  return SavedJob;
};
