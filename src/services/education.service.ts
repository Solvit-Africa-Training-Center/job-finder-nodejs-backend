import { AppError } from '../utils';
import {
  Education,
  EducationCreationAttributes,
} from '../database/models/education.model';
import { InferAttributes } from 'sequelize';

type CreateEducationData = EducationCreationAttributes;
type UpdateEducationData = Partial<InferAttributes<Education>>;

export class EducationService {
  async createEducation(data: CreateEducationData) {
    return await Education.create(data);
  }

  async getEducationById(id: string) {
    return await Education.findByPk(id);
  }

  async getCandidateEducation(candidateProfileId: string) {
    const education = await Education.findAll({
      where: { candidateProfileId },
      order: [
        ['isCurrent', 'DESC'],
        ['startDate', 'DESC'],
      ],
      limit: 50,
    });

    return education;
  }

  async updateEducation(id: string, data: UpdateEducationData) {
    const education = await Education.findByPk(id);
    if (!education) {
      throw new AppError('Education record not found', 404);
    }

    return await education.update(data);
  }

  async deleteEducation(id: string) {
    const education = await Education.findByPk(id);
    if (!education) {
      throw new AppError('Education record not found', 404);
    }

    await education.destroy();
    return { message: 'Education record deleted successfully' };
  }
}
