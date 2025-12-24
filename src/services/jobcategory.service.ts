import { JobCategory } from "src/database/models/jobcategory";

interface Models {
  JobCategory: typeof JobCategory;
}

export class JobCategoryService {
  private models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  // CREATE
  create = async (data: {
    name: string;
    description?: string;
    parentId?: number;
  }) => {
    return await this.models.JobCategory.create(data);
  };

  // READ ALL
  fetchAll = async () => {
    return await this.models.JobCategory.findAll();
  };

  // READ ONE
  fetchById = async (id: number) => {
    const category = await this.models.JobCategory.findByPk(id);
    if (!category) {
      throw new Error("Job category not found");
    }
    return category;
  };

  // UPDATE
  update = async (
    id: number,
    data: {
      name?: string;
      description?: string;
      parentId?: number;
    }
  ) => {
    const category = await this.fetchById(id);
    await category.update(data);
    return category;
  };

  // DELETE
  delete = async (id: number) => {
    const category = await this.fetchById(id);
    await category.destroy();
    return true;
  };
}
