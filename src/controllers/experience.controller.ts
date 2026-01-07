import { Request, Response } from 'express';
import { ExperienceService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';

const experienceService = new ExperienceService();

export class ExperienceController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const {
      candidateProfileId,
      companyName,
      jobTitle,
      employmentType,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      achievements,
    } = req.body;

    if (
      !candidateProfileId ||
      !companyName ||
      !jobTitle ||
      !employmentType ||
      !startDate
    ) {
      throw new AppError(
        'candidateProfileId, companyName, jobTitle, employmentType, and startDate are required',
        400,
      );
    }

    const experience = await experienceService.createExperience({
      candidateProfileId,
      companyName,
      jobTitle,
      employmentType,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      achievements,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Experience record created successfully',
      data: experience,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const experience = await experienceService.getExperienceById(id);

    if (!experience) {
      throw new AppError('Experience record not found', 404);
    }

    return successResponse(res, { data: experience });
  });

  getCandidateExperience = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId } = req.params;
    const experience =
      await experienceService.getCandidateExperience(candidateId);

    return successResponse(res, { data: experience });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const experience = await experienceService.updateExperience(id, req.body);

    return successResponse(res, {
      message: 'Experience record updated successfully',
      data: experience,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await experienceService.deleteExperience(id);

    return successResponse(res, { message: result.message });
  });
}
