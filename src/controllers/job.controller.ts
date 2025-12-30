import { Request, Response } from 'express';
import JobService from '../services/job.service';

class JobController {
  static async createJob(req: Request, res: Response) {
    try {
      const job = await JobService.createJob(req.body);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  }

  static async getAllJobs(req: Request, res: Response) {
    try {
      const jobs = await JobService.getAllJobs();
      res.status(200).json(jobs);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  }

  static async getJobById(req: Request, res: Response) {
    try {
      const job = await JobService.getJobById(req.params.id);
      res.status(200).json(job);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    }
  }

  static async updateJob(req: Request, res: Response) {
    try {
      const job = await JobService.updateJob(req.params.id, req.body);
      res.status(200).json(job);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    }
  }

  static async deleteJob(req: Request, res: Response) {
    try {
      await JobService.deleteJob(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    }
  }
}

export default JobController;
