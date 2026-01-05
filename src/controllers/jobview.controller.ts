import { Request, Response } from "express";
import { JobViewService } from "../services/jobview.service";
import { createJobViewSchema } from "../validations/jobview.validation";

export class JobViewController {
  // -----------------------
  // Create a new JobView
  // -----------------------
  static async create(req: Request, res: Response) {
    try {
      // Validate request body using your validation schema
      const { error } = createJobViewSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Create JobView
      const jobView = await JobViewService.createJobView(req.body);

      // Respond with full object and message
      return res.status(201).json({
        message: "Job view created",
        data: jobView,
      });
    } catch (err: any) {
      console.error("Error creating job view:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // -----------------------
  // Get all views for a specific job
  // -----------------------
  static async getByJob(req: Request, res: Response) {
    try {
      const { jobId } = req.params;

      // Fetch all views
      const views = await JobViewService.getJobViewsByJob(jobId);

      return res.json({
        job_id: jobId,
        total_views: views.length,
        data: views,
      });
    } catch (err: any) {
      console.error("Error fetching job views:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // -----------------------
  // Count views for a specific job
  // -----------------------
  static async count(req: Request, res: Response) {
    try {
      const { jobId } = req.params;

      const total = await JobViewService.countJobViews(jobId);

      return res.json({
        job_id: jobId,
        views: total,
      });
    } catch (err: any) {
      console.error("Error counting job views:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
