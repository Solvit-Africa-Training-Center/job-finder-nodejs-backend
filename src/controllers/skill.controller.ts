import { Request, Response } from 'express';
import { SkillService } from '../services';
import { asyncHandler } from '../utils';
import { AppError } from '../utils';

const skillService = new SkillService();

export class SkillController {
  createSkill = asyncHandler(async (req: Request, res: Response) => {
    const skillData = req.body;
    const skill = await skillService.createSkill(skillData);

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill,
    });
  });

  getAllSkills = asyncHandler(async (req: Request, res: Response) => {
    const skills = await skillService.getAllSkills();

    res.status(200).json({
      success: true,
      message: 'Skills retrieved successfully',
      data: skills,
      count: skills.length,
    });
  });

  getSkillById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const skill = await skillService.getSkillById(id);

    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Skill retrieved successfully',
      data: skill,
    });
  });

  updateSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const skill = await skillService.getSkillById(id);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    const updatedSkill = await skillService.updateSkill(id, updateData);

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: updatedSkill,
    });
  });

  deleteSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const skill = await skillService.getSkillById(id);
    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    await skillService.deleteSkill(id);

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
    });
  });

  getSkillsByCategory = asyncHandler(async (req: Request, res: Response) => {
    const { category } = req.params;
    const skills = await skillService.getSkillsByCategory(category);

    res.status(200).json({
      success: true,
      message: 'Skills retrieved successfully',
      data: skills,
      count: skills.length,
    });
  });
}
