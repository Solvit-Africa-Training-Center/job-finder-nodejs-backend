import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface CandidateProfileAttributes {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePictureUrl?: string;
  bio?: string;
  headline?: string;
  location?: string;
  resumeUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CandidateProfile
  extends Model<
    CandidateProfileAttributes,
    Optional<
      CandidateProfileAttributes,
      'id' | 'profilePictureUrl' | 'bio' | 'headline' | 'location' | 'resumeUrl'
    >
  >
  implements CandidateProfileAttributes
{
  public id!: string;
  public userId!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phone!: string;
  public profilePictureUrl?: string;
  public bio?: string;
  public headline?: string;
  public location?: string;
  public resumeUrl?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  association() {}
}

export const initCandidateProfileModel = (sequelize: Sequelize) => {
  CandidateProfile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePictureUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'candidate_profiles',
      timestamps: true,
    },
  );

  return CandidateProfile;
};
