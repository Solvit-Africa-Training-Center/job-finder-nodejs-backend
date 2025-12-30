import { Request, Response } from "express";
import { JobCategoryService } from "../services/job-category.service";

export class JobCategoryController {
  //Create a new category
  static createJobCategory(req: Request, res: Response) {
    const { name, parentId } = req.body;

    const category = JobCategoryService.create(name, parentId);

    return res.status(201).json({
      message: "Job category created successfully",
      data: category,
    });
  }

  //Get all category
  static getJobCategories(_req: Request, res: Response) {
    const categories = JobCategoryService.findAll();

    return res.json({
      data: categories,
    });
  }

   // Get a single category by ID
  static getJobCategoryById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = JobCategoryService.findById(id);

      if (!category) {
        return res.status(404).json({
          error: "Job category not found",
        });
      }

      return res.status(200).json({
        message: "Job category retrieved successfully",
        data: category,
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }}

  //Update Job category
 static updateJobCategory(req: Request, res: Response) {
  try {
    const updated = JobCategoryService.update(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      message: "Job category updated successfully",
      data: updated,
    });
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
}

}
