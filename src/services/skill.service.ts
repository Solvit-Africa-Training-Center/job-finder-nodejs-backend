import { Skill, SkillAttributes } from '../database/models/skill.model';
import { Optional } from 'sequelize';

export class SkillService {
  createSkill = async (
    skillData: Optional<SkillAttributes, 'id' | 'description' | 'category'>,
  ) => {
    return await Skill.create(skillData);
  };

  getAllSkills = async () => {
    return await Skill.findAll();
  };

  getSkillById = async (id: string) => {
    return await Skill.findByPk(id);
  };

  getSkillByName = async (name: string) => {
    return await Skill.findOne({
      where: { name },
    });
  };

  updateSkill = async (id: string, updateData: Partial<SkillAttributes>) => {
    await Skill.update(updateData, { where: { id } });
    return await Skill.findByPk(id);
  };

  deleteSkill = async (id: string) => {
    return await Skill.destroy({ where: { id } });
  };

  getSkillsByCategory = async (category: string) => {
    return await Skill.findAll({
      where: { category },
    });
  };
}
