import Job, { JobCreationAttributes } from '../database/models/job';

class JobService {
  /**
   * Create a new job
   */
  static async createJob(data: JobCreationAttributes) {
    const job = await Job.create(data);
    return job;
  }

  
  static async getAllJobs() {
    const jobs = await Job.findAll({
      order: [['created_at', 'DESC']],
    });

    return jobs;
  }

  /**
   * Get single job by ID
   */
  static async getJobById(jobId: string) {
    const job = await Job.findByPk(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    return job;
  }

  /**
   * Update job
   */
  static async updateJob(jobId: string, data: Partial<JobCreationAttributes>) {
    const job = await Job.findByPk(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    await job.update(data);
    return job;
  }

  /**
   * Soft delete job
   */
  static async deleteJob(jobId: string) {
    const job = await Job.findByPk(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    await job.destroy(); // paranoid: true → soft delete
    return true;
  }

  /**
   * Publish job
   */
  static async publishJob(jobId: string) {
    const job = await Job.findByPk(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    await job.update({
      status: 'Active',
      published_at: new Date(),
    });

    return job;
  }

  /**
   * Close job
   */
  static async closeJob(jobId: string) {
    const job = await Job.findByPk(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    await job.update({
      status: 'Closed',
    });

    return job;
  }

  /**
   * Restore soft-deleted job
   */
  static async restoreJob(jobId: string) {
    const job = await Job.findByPk(jobId, { paranoid: false });

    if (!job) {
      throw new Error('Job not found');
    }

    if (!job.deleted_at) {
      throw new Error('Job is not deleted');
    }

    await job.restore();
    return job;
  }
}

export default JobService;
