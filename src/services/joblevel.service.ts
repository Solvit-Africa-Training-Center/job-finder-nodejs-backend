import { ModelStatic, Model } from "sequelize";

interface Models {
  JobLevel: ModelStatic<Model>;
}

export class JobLevelService {
  private models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  create = async (data: {
    name: string;
    order?: number;
    description?: string;
  }) => {
    return await this.models.JobLevel.create(data);
  };

  fetchAll = async () => {
    return await this.models.JobLevel.findAll({
      order: [["order", "ASC"]],
    });
  };

  fetchById = async (id: number) => {
    const jobLevel = await this.models.JobLevel.findByPk(id);
    if (!jobLevel) {
      throw new Error("Job level not found");
    }
    return jobLevel;
  };

  update = async (
    id: number,
    data: {
      name?: string;
      order?: number;
      description?: string;
    }
  ) => {
    const jobLevel = await this.fetchById(id);
    await jobLevel.update(data);
    return jobLevel;
  };

  delete = async (id: number) => {
    const jobLevel = await this.fetchById(id);
    await jobLevel.destroy();
    return true;
  };
}
