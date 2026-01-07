import { DataTypes, Model, Sequelize } from 'sequelize';
import { ProficiencyLevel } from './enums';

interface CandidateSkillAttributes {
  id: string;
  candidateProfileId: string;
  skillId: string;
  proficiencyLevel: ProficiencyLevel;
  yearsOfExperience?: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CandidateSkillCreationAttributes = Omit<
  CandidateSkillAttributes,
  'id' | 'createdAt' | 'updatedAt'
> & {
  yearsOfExperience?: number;
  isFeatured?: boolean;
};

export class CandidateSkill
  extends Model<CandidateSkillAttributes, CandidateSkillCreationAttributes>
  implements CandidateSkillAttributes
{
  id!: string;
  candidateProfileId!: string;
  skillId!: string;
  proficiencyLevel!: ProficiencyLevel;
  yearsOfExperience?: number;
  isFeatured!: boolean;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const initCandidateSkillModel = (
  sequelize: Sequelize,
): typeof CandidateSkill => {
  CandidateSkill.init(
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
      skillId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'skills',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      proficiencyLevel: {
        type: DataTypes.ENUM(...Object.values(ProficiencyLevel)),
        allowNull: false,
        defaultValue: ProficiencyLevel.BEGINNER,
      },
      yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Whether this skill should be featured/highlighted',
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
      tableName: 'candidate_skills',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['candidateProfileId', 'skillId'],
        },
      ],
    },
  );

  return CandidateSkill;
};
