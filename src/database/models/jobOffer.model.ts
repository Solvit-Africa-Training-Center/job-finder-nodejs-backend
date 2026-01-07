import { DataTypes, Model, Sequelize } from 'sequelize';
import { JobOfferStatus } from './enums';

interface JobOfferAttributes {
  id: string;
  candidateProfileId: string;
  jobId: string;
  recruiterId: string;
  offeredSalary?: number;
  offerDate: Date;
  expiryDate?: Date;
  status: JobOfferStatus;
  offerLetter?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type JobOfferCreationAttributes = Omit<
  JobOfferAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {
  status?: JobOfferStatus;
  offeredSalary?: number;
  expiryDate?: Date;
  offerLetter?: string;
  notes?: string;
};

export class JobOffer
  extends Model<JobOfferAttributes, JobOfferCreationAttributes>
  implements JobOfferAttributes
{
  id!: string;
  candidateProfileId!: string;
  jobId!: string;
  recruiterId!: string;
  offeredSalary?: number;
  offerDate!: Date;
  expiryDate?: Date;
  status!: JobOfferStatus;
  offerLetter?: string;
  notes?: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt?: Date;

  toJSON() {
    const values = { ...this.get() };
    delete values.deletedAt;
    return values;
  }
}

export const initJobOfferModel = (sequelize: Sequelize): typeof JobOffer => {
  JobOffer.init(
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
      recruiterId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'recruiter_profiles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      offeredSalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      offerDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(JobOfferStatus)),
        allowNull: false,
        defaultValue: JobOfferStatus.PENDING,
      },
      offerLetter: {
        type: DataTypes.STRING(500),
        allowNull: true,
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'job_offers',
      timestamps: true,
      paranoid: true,
    },
  );

  return JobOffer;
};
