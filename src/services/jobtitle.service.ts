import { ModelStatic, Model } from "sequelize";

interface Models {
  JobTitle: ModelStatic<Model>;
}

export class JobTitleService {
  private models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  create = async (data: {
    name: string;
    description?: string;
  }) => {
    return await this.models.JobTitle.create(data);
  };

  fetchAll = async () => {
    return await this.models.JobTitle.findAll({
      order: [["name", "ASC"]],
    });
  };

  fetchById = async (id: number) => {
    const jobTitle = await this.models.JobTitle.findByPk(id);
    if (!jobTitle) {
      throw new Error("Job title not found");
    }
    return jobTitle;
  };

  update = async (
    id: number,
    data: {
      name?: string;
      description?: string;
    }
  ) => {
    const jobTitle = await this.fetchById(id);
    await jobTitle.update(data);
    return jobTitle;
  };

  delete = async (id: number) => {
    const jobTitle = await this.fetchById(id);
    await jobTitle.destroy();
    return true;
  };
}
