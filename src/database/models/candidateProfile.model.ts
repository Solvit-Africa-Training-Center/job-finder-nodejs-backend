import { DataTypes, Model, Sequelize } from 'sequelize';
import { Gender, Availability } from './enums';

interface CandidateProfileAttributes {
  id: string;
  userId: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  address?: string;
  city?: string;
  country?: string;
  bio?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  expectedSalary?: number;
  availability?: Availability;
  isProfileComplete: boolean;
  profileCompletionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type CandidateProfileCreationAttributes = Omit<
  CandidateProfileAttributes,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'isProfileComplete'
  | 'profileCompletionPercentage'
> & {
  isProfileComplete?: boolean;
  profileCompletionPercentage?: number;
};

export class CandidateProfile
  extends Model<CandidateProfileAttributes, CandidateProfileCreationAttributes>
  implements CandidateProfileAttributes
{
  id!: string;
  userId!: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  address?: string;
  city?: string;
  country?: string;
  bio?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  expectedSalary?: number;
  availability?: Availability;
  isProfileComplete!: boolean;
  profileCompletionPercentage!: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt?: Date;

  toJSON() {
    const values = { ...this.get() };
    delete values.deletedAt;
    return values;
  }
}

export const initCandidateProfileModel = (
  sequelize: Sequelize,
): typeof CandidateProfile => {
  CandidateProfile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(Gender)),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      linkedinUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      portfolioUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      githubUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      expectedSalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      availability: {
        type: DataTypes.ENUM(...Object.values(Availability)),
        allowNull: true,
      },
      isProfileComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      profileCompletionPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'candidate_profiles',
      timestamps: true,
      paranoid: true,
    },
  );

  return CandidateProfile;
};
