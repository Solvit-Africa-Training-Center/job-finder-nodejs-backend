import { randomUUID } from "crypto";
import { JobCategory } from "../types/job-category.types";
import { mockDb } from "../database/mock-db";

export class JobCategoryService {
  static create(name: string, parentId?: string | null): JobCategory {
    if (!name) {
      throw new Error("Category name is required");
    }

    const now = new Date();

    const category: JobCategory = {
      id: randomUUID(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      parentId: parentId ?? null,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    return mockDb.createJobCategory(category);
  }

  static findAll(): JobCategory[] {
    return mockDb.getJobCategories();
  }

  static findById(id: string): JobCategory | undefined {
    return mockDb.findJobCategoryById(id);
  }


  //Update job category
  static update(
    id: string,
    payload: Partial<JobCategory>
  ): JobCategory {
    const existing = mockDb.findJobCategoryById(id);

    if (!existing) {
      throw new Error("Job category not found");
    }

    const { id: _, createdAt: __, ...safePayload } = payload;

    if (
      safePayload.name &&
      (typeof safePayload.name !== "string" || !safePayload.name.trim())
    ) {
      throw new Error("Name must be a non-empty string");
    }

    const updates: Partial<JobCategory> = {
      ...safePayload,
      slug: safePayload.name
        ? safePayload.name.toLowerCase().replace(/\s+/g, "-")
        : existing.slug,
      updatedAt: new Date(),
    };

    const updated = mockDb.updateJobCategory(id, updates);
    if (!updated) {
      throw new Error("Failed to update job category");
    }

    return updated;
  }

   // Delete category by ID
  static delete(id: string): boolean {
    const existing = mockDb.findJobCategoryById(id);
    if (!existing) return false;

    // Remove from mock DB
    mockDb.removeJobCategory(id);
    return true;
  }
}
