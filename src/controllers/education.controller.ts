import { Request, Response } from 'express';
import { EducationService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';

const educationService = new EducationService();

export class EducationController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const {
      candidateProfileId,
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      isCurrent,
      grade,
      description,
    } = req.body;

    if (
      !candidateProfileId ||
      !institution ||
      !degree ||
      !fieldOfStudy ||
      !startDate
    ) {
      throw new AppError(
        'candidateProfileId, institution, degree, fieldOfStudy, and startDate are required',
        400,
      );
    }

    const education = await educationService.createEducation({
      candidateProfileId,
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      isCurrent,
      grade,
      description,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Education record created successfully',
      data: education,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const education = await educationService.getEducationById(id);

    if (!education) {
      throw new AppError('Education record not found', 404);
    }

    return successResponse(res, { data: education });
  });

  getCandidateEducation = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId } = req.params;
    const education = await educationService.getCandidateEducation(candidateId);

    return successResponse(res, { data: education });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const education = await educationService.updateEducation(id, req.body);

    return successResponse(res, {
      message: 'Education record updated successfully',
      data: education,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await educationService.deleteEducation(id);

    return successResponse(res, { message: result.message });
  });
}
