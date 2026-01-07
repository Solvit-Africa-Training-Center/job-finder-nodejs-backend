import { AppError } from '../utils';
import { Skill, SkillCreationAttributes } from '../database/models/skill.model';
import { InferAttributes, Op } from 'sequelize';

type CreateSkillData = SkillCreationAttributes;
type UpdateSkillData = Partial<InferAttributes<Skill>>;

export class SkillService {
  async createSkill(data: CreateSkillData) {
    const existingSkill = await Skill.findOne({
      where: { name: data.name },
    });

    if (existingSkill) {
      throw new AppError('Skill with this name already exists', 400);
    }

    return await Skill.create(data);
  }

  async getAllSkills(filters: {
    category?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const whereClause: Record<string, unknown> = {};

    if (filters.category) whereClause.category = filters.category;
    if (filters.isActive !== undefined) whereClause.isActive = filters.isActive;

    const limit = Math.min(filters.limit || 5, 100);
    const offset = filters.offset || 0;

    const { rows: skills, count } = await Skill.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['name', 'ASC']],
    });

    return {
      skills,
      pagination: {
        total: count,
        limit,
        offset,
        totalPages: Math.ceil(count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        hasNextPage: offset + limit < count,
        hasPreviousPage: offset > 0,
      },
    };
  }

  async getSkillById(id: string) {
    return await Skill.findByPk(id);
  }

  async updateSkill(id: string, data: UpdateSkillData) {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    if (data.name && data.name !== skill.name) {
      const existingSkill = await Skill.findOne({
        where: { name: data.name },
      });
      if (existingSkill) {
        throw new AppError('Skill with this name already exists', 400);
      }
    }

    return await skill.update(data);
  }

  async deleteSkill(id: string) {
    const skill = await Skill.findByPk(id);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    await skill.destroy();
    return { message: 'Skill deleted successfully' };
  }

  async searchSkills(query: string) {
    return await Skill.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
        isActive: true,
      },
      limit: 20,
      order: [['name', 'ASC']],
    });
  }
}
