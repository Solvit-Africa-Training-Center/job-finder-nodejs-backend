import { JobCategory } from "../types/job-category.types";

class MockDatabase {
  private jobCategories: JobCategory[] = [];

  createJobCategory(category: JobCategory): JobCategory {
    this.jobCategories.push(category);
    return category;
  }

  getJobCategories(): JobCategory[] {
    return this.jobCategories;
  }

  findJobCategoryById(id: string): JobCategory | undefined {
    return this.jobCategories.find((c) => c.id === id);
  }


  updateJobCategory(
    id: string,
    updates: Partial<JobCategory>
  ): JobCategory | null {
    const index = this.jobCategories.findIndex(c => c.id === id);
    if (index === -1) return null;

    const existing = this.jobCategories[index];

    const updated: JobCategory = {
      ...existing,
      ...updates,
      id: existing.id,          
      createdAt: existing.createdAt, 
    };

    this.jobCategories[index] = updated;
    return updated;
  }

   removeJobCategory(id: string): boolean {
    const index = this.jobCategories.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.jobCategories.splice(index, 1);
    return true;
  }

  clear() {
    this.jobCategories = [];
  }
}

export const mockDb = new MockDatabase();
