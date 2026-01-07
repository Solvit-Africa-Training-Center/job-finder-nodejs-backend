import { Request, Response } from 'express';
import { JobOfferService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';
import { JobOfferStatus } from '../database/models';

const jobOfferService = new JobOfferService();

export class JobOfferController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const {
      candidateProfileId,
      jobId,
      recruiterId,
      offeredSalary,
      offerDate,
      expiryDate,
      status,
      offerLetter,
      notes,
    } = req.body;

    if (!candidateProfileId || !jobId || !recruiterId || !offerDate) {
      throw new AppError(
        'candidateProfileId, jobId, recruiterId, and offerDate are required',
        400,
      );
    }

    const jobOffer = await jobOfferService.createOffer({
      candidateProfileId,
      jobId,
      recruiterId,
      offeredSalary,
      offerDate,
      expiryDate,
      status,
      offerLetter,
      notes,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Job offer created successfully',
      data: jobOffer,
    });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const jobOffer = await jobOfferService.getOfferById(id);

    if (!jobOffer) {
      throw new AppError('Job offer not found', 404);
    }

    return successResponse(res, { data: jobOffer });
  });

  getCandidateOffers = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId } = req.params;
    const offers = await jobOfferService.getCandidateOffers(candidateId);

    return successResponse(res, { data: offers });
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new AppError('Status is required', 400);
    }

    if (!Object.values(JobOfferStatus).includes(status)) {
      throw new AppError('Invalid status value', 400);
    }

    const jobOffer = await jobOfferService.updateOfferStatus(id, status);

    return successResponse(res, {
      message: 'Job offer status updated successfully',
      data: jobOffer,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const jobOffer = await jobOfferService.updateOffer(id, req.body);

    return successResponse(res, {
      message: 'Job offer updated successfully',
      data: jobOffer,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await jobOfferService.deleteOffer(id);

    return successResponse(res, { message: result.message });
  });

  getOfferHistory = asyncHandler(async (req: Request, res: Response) => {
    const { candidateId } = req.params;
    const history = await jobOfferService.getOfferHistory(candidateId);

    return successResponse(res, { data: history });
  });
}
