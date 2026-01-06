import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface CandidateSkillAttributes {
  id: string;
  candidateProfileId: string;
  skillId: string;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CandidateSkill
  extends Model<
    CandidateSkillAttributes,
    Optional<CandidateSkillAttributes, 'id' | 'yearsOfExperience'>
  >
  implements CandidateSkillAttributes
{
  public id!: string;
  public candidateProfileId!: string;
  public skillId!: string;
  public proficiencyLevel!: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  public yearsOfExperience?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  association() {}
}

export const initCandidateSkillModel = (sequelize: Sequelize) => {
  CandidateSkill.init(
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
      skillId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      proficiencyLevel: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'expert'),
        allowNull: false,
        defaultValue: 'intermediate',
      },
      yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'candidate_skills',
      timestamps: true,
    },
  );

  return CandidateSkill;
};
