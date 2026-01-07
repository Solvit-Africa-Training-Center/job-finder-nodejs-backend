import { AppError } from '../utils';
import {
  Experience,
  ExperienceCreationAttributes,
} from '../database/models/experience.model';
import { InferAttributes } from 'sequelize';

type CreateExperienceData = ExperienceCreationAttributes;
type UpdateExperienceData = Partial<InferAttributes<Experience>>;

export class ExperienceService {
  async createExperience(data: CreateExperienceData) {
    return await Experience.create(data);
  }

  async getExperienceById(id: string) {
    return await Experience.findByPk(id);
  }

  async getCandidateExperience(candidateProfileId: string) {
    const experience = await Experience.findAll({
      where: { candidateProfileId },
      order: [
        ['isCurrent', 'DESC'],
        ['startDate', 'DESC'],
      ],
      limit: 50,
    });

    return experience;
  }

  async updateExperience(id: string, data: UpdateExperienceData) {
    const experience = await Experience.findByPk(id);
    if (!experience) {
      throw new AppError('Experience record not found', 404);
    }

    return await experience.update(data);
  }

  async deleteExperience(id: string) {
    const experience = await Experience.findByPk(id);
    if (!experience) {
      throw new AppError('Experience record not found', 404);
    }

    await experience.destroy();
    return { message: 'Experience record deleted successfully' };
  }
}
