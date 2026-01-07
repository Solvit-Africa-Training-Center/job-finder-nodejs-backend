import { Request, Response } from 'express';
import { SavedJobService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';

const savedJobService = new SavedJobService();

export class SavedJobController {
  saveJob = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId, jobId, notes } = req.body;

    if (!candidateProfileId || !jobId) {
      throw new AppError('candidateProfileId and jobId are required', 400);
    }

    const savedJob = await savedJobService.saveJob({
      candidateProfileId,
      jobId,
      notes,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Job saved successfully',
      data: savedJob,
    });
  });

  getSavedJobs = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId } = req.params;
    const savedJobs = await savedJobService.getSavedJobs(candidateId);

    return successResponse(res, { data: savedJobs });
  });

  unsaveJob = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await savedJobService.unsaveJob(id);

    return successResponse(res, { message: result.message });
  });

  checkIfSaved = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId, jobId } = req.params;
    const result = await savedJobService.isJobSaved(candidateId, jobId);

    return successResponse(res, { data: result });
  });
}
