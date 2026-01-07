import { Request, Response } from 'express';
import { SkillService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';

const skillService = new SkillService();

export class SkillController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { name, category, isActive } = req.body;

    if (!name) {
      throw new AppError('Skill name is required', 400);
    }

    const skill = await skillService.createSkill({
      name,
      category,
      isActive,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Skill created successfully',
      data: skill,
    });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { category, isActive, limit, offset } = req.query;

    const result = await skillService.getAllSkills({
      category: category as string,
      isActive:
        isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });

    return successResponse(res, { data: result });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const skill = await skillService.getSkillById(id);

    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    return successResponse(res, { data: skill });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const skill = await skillService.updateSkill(id, req.body);

    return successResponse(res, {
      message: 'Skill updated successfully',
      data: skill,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await skillService.deleteSkill(id);

    return successResponse(res, { message: result.message });
  });

  search = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      throw new AppError('Search query is required', 400);
    }

    const skills = await skillService.searchSkills(q);

    return successResponse(res, { data: skills });
  });
}
