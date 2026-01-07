import { Request, Response } from 'express';
import { CandidateProfileService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';

const candidateProfileService = new CandidateProfileService();

export class CandidateProfileController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const {
      userId,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      city,
      country,
      bio,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      expectedSalary,
      availability,
    } = req.body;

    if (!userId) {
      throw new AppError('userId is required', 400);
    }

    const profile = await candidateProfileService.createProfile({
      userId,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      city,
      country,
      bio,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      expectedSalary,
      availability,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Candidate profile created successfully',
      data: profile,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = await candidateProfileService.getProfileById(id);

    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    return successResponse(res, { data: profile });
  });

  getByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const profile = await candidateProfileService.getProfileByUserId(userId);

    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    return successResponse(res, { data: profile });
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { city, country, availability, limit, offset } = req.query;

    const result = await candidateProfileService.getAllProfiles({
      city: city as string,
      country: country as string,
      availability: availability as string,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });

    return successResponse(res, { data: result });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = await candidateProfileService.updateProfile(id, req.body);

    return successResponse(res, {
      message: 'Candidate profile updated successfully',
      data: profile,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await candidateProfileService.deleteProfile(id);

    return successResponse(res, { message: result.message });
  });

  getProfileCompletion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await candidateProfileService.calculateAndUpdateCompletion(id);

    return successResponse(res, { data: result });
  });
}
