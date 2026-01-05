import JobView from '../database/models/jobview';
import { v4 as uuidv4 } from 'uuid';

export class JobViewService {
  static async createJobView(data: any) {
    return await JobView.create({
      id: uuidv4(),
      ...data,
    });
  }

  static async getJobViewsByJob(jobId: string) {
    return await JobView.findAll({
      where: { job_id: jobId },
      order: [["viewed_at", "DESC"]],
    });
  }

  static async countJobViews(jobId: string) {
    return await JobView.count({
      where: { job_id: jobId },
    });
  }
}
