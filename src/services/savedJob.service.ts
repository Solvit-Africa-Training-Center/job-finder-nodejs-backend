import { AppError } from '../utils';
import {
  SavedJob,
  SavedJobCreationAttributes,
} from '../database/models/savedJob.model';

type CreateSavedJobData = SavedJobCreationAttributes;

export class SavedJobService {
  async saveJob(data: CreateSavedJobData) {
    const existingSavedJob = await SavedJob.findOne({
      where: {
        candidateProfileId: data.candidateProfileId,
        jobId: data.jobId,
      },
    });

    if (existingSavedJob) {
      throw new AppError('Job is already saved', 400);
    }

    return await SavedJob.create(data);
  }

  async getSavedJobs(candidateProfileId: string) {
    const savedJobs = await SavedJob.findAll({
      where: { candidateProfileId },
      order: [['createdAt', 'DESC']],
      limit: 100,
    });

    return savedJobs;
  }

  async unsaveJob(id: string) {
    const savedJob = await SavedJob.findByPk(id);
    if (!savedJob) {
      throw new AppError('Saved job not found', 404);
    }

    await savedJob.destroy();
    return { message: 'Job removed from saved jobs successfully' };
  }

  async isJobSaved(candidateProfileId: string, jobId: string) {
    const savedJob = await SavedJob.findOne({
      where: {
        candidateProfileId,
        jobId,
      },
    });

    return { isSaved: !!savedJob };
  }
}
