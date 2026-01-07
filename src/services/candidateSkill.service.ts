import { AppError } from '../utils';
import {
  CandidateSkill,
  CandidateSkillCreationAttributes,
} from '../database/models/candidateSkill.model';
import { Skill } from '../database/models/skill.model';
import { InferAttributes } from 'sequelize';

type CreateCandidateSkillData = CandidateSkillCreationAttributes;
type UpdateCandidateSkillData = Partial<InferAttributes<CandidateSkill>>;

export class CandidateSkillService {
  async addSkillToCandidate(data: CreateCandidateSkillData) {
    const existingSkill = await CandidateSkill.findOne({
      where: {
        candidateProfileId: data.candidateProfileId,
        skillId: data.skillId,
      },
    });

    if (existingSkill) {
      throw new AppError(
        'This skill is already added to the candidate profile',
        400,
      );
    }

    return await CandidateSkill.create(data);
  }

  async getCandidateSkills(candidateProfileId: string) {
    const skills = await CandidateSkill.findAll({
      where: { candidateProfileId },
      include: [
        {
          model: Skill,
          as: 'skill',
        },
      ],
      order: [
        ['isFeatured', 'DESC'],
        ['proficiencyLevel', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      limit: 100,
    });

    return skills;
  }

  async updateCandidateSkill(id: string, data: UpdateCandidateSkillData) {
    const candidateSkill = await CandidateSkill.findByPk(id);
    if (!candidateSkill) {
      throw new AppError('Candidate skill not found', 404);
    }

    return await candidateSkill.update(data);
  }

  async deleteCandidateSkill(id: string) {
    const candidateSkill = await CandidateSkill.findByPk(id);

    if (!candidateSkill) {
      throw new AppError('Candidate skill not found', 404);
    }

    await candidateSkill.destroy();
    return { message: 'Skill removed successfully' };
  }

  async toggleFeatured(id: string, isFeatured: boolean) {
    const candidateSkill = await CandidateSkill.findByPk(id, {
      include: [
        {
          model: Skill,
          as: 'skill',
        },
      ],
    });

    if (!candidateSkill) {
      throw new AppError('Candidate skill not found', 404);
    }

    await candidateSkill.update({ isFeatured });
    return candidateSkill;
  }

  async getFeaturedSkills(candidateProfileId: string) {
    const skills = await CandidateSkill.findAll({
      where: {
        candidateProfileId,
        isFeatured: true,
      },
      include: [
        {
          model: Skill,
          as: 'skill',
        },
      ],
      order: [
        ['proficiencyLevel', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      limit: 10,
    });

    return skills;
  }
}
