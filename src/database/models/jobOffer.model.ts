import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface JobOfferAttributes {
  id: string;
  candidateProfileId: string;
  jobId: string;
  offerDate: Date;
  salary?: number;
  currency?: string;
  position: string;
  company: string;
  offerStatus: 'pending' | 'accepted' | 'rejected' | 'expired';
  expiryDate?: Date;
  terms?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class JobOffer
  extends Model<
    JobOfferAttributes,
    Optional<
      JobOfferAttributes,
      'id' | 'salary' | 'currency' | 'expiryDate' | 'terms' | 'notes'
    >
  >
  implements JobOfferAttributes
{
  public id!: string;
  public candidateProfileId!: string;
  public jobId!: string;
  public offerDate!: Date;
  public salary?: number;
  public currency?: string;
  public position!: string;
  public company!: string;
  public offerStatus!: 'pending' | 'accepted' | 'rejected' | 'expired';
  public expiryDate?: Date;
  public terms?: string;
  public notes?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  association() {}
}

export const initJobOfferModel = (sequelize: Sequelize) => {
  JobOffer.init(
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
      offerDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'USD',
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      offerStatus: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'expired'),
        allowNull: false,
        defaultValue: 'pending',
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      terms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'job_offers',
      timestamps: true,
    },
  );

  return JobOffer;
};
