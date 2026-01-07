import { Request, Response } from 'express';
import { CandidateSkillService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';

const candidateSkillService = new CandidateSkillService();

export class CandidateSkillController {
  addSkill = asyncHandler(async (req: Request, res: Response) => {
    const {
      candidateProfileId,
      skillId,
      proficiencyLevel,
      yearsOfExperience,
      isFeatured,
    } = req.body;

    if (!candidateProfileId || !skillId || !proficiencyLevel) {
      throw new AppError(
        'candidateProfileId, skillId, and proficiencyLevel are required',
        400,
      );
    }

    const candidateSkill = await candidateSkillService.addSkillToCandidate({
      candidateProfileId,
      skillId,
      proficiencyLevel,
      yearsOfExperience,
      isFeatured,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Skill added to candidate successfully',
      data: candidateSkill,
    });
  });

  getCandidateSkills = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId } = req.query;

    if (!candidateId || typeof candidateId !== 'string') {
      throw new AppError('candidateId query parameter is required', 400);
    }

    const skills = await candidateSkillService.getCandidateSkills(candidateId);

    return successResponse(res, { data: skills });
  });

  updateCandidateSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      throw new AppError('id query parameter is required', 400);
    }

    const candidateSkill = await candidateSkillService.updateCandidateSkill(
      id,
      req.body,
    );

    return successResponse(res, {
      message: 'Candidate skill updated successfully',
      data: candidateSkill,
    });
  });

  deleteCandidateSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      throw new AppError('id query parameter is required', 400);
    }

    const result = await candidateSkillService.deleteCandidateSkill(id);

    return successResponse(res, { message: result.message });
  });

  toggleFeatured = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.query;
    const { isFeatured } = req.body;

    if (!id || typeof id !== 'string') {
      throw new AppError('id query parameter is required', 400);
    }

    if (typeof isFeatured !== 'boolean') {
      throw new AppError('isFeatured must be a boolean value', 400);
    }

    const skill = await candidateSkillService.toggleFeatured(id, isFeatured);

    return successResponse(res, {
      message: `Skill ${isFeatured ? 'marked as featured' : 'unmarked as featured'}`,
      data: skill,
    });
  });

  getFeaturedSkills = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId } = req.query;

    if (!candidateId || typeof candidateId !== 'string') {
      throw new AppError('candidateId query parameter is required', 400);
    }

    const skills = await candidateSkillService.getFeaturedSkills(candidateId);

    return successResponse(res, { data: skills });
  });
}
