import { JobLevel } from "../database/models/joblevel";

export class JobLevelService {
  
  create = async (data: {
    name: string;
    description?: string;
  }) => {
    return await JobLevel.create(data);
  };

  
  fetchAll = async () => {
    return await JobLevel.findAll({
      order: [["name", "ASC"]],
    });
  };

  
  fetchById = async (id: string) => {
    const jobLevel = await JobLevel.findByPk(id);

    if (!jobLevel) {
      throw new Error("Job level not found");
    }

    return jobLevel;
  };

 
  update = async (
    id: string,
    data: {
      name?: string;
      description?: string;
    }
  ) => {
    const jobLevel = await this.fetchById(id);
    await jobLevel.update(data);
    return jobLevel;
  };

  
  delete = async (id: string) => {
    const jobLevel = await this.fetchById(id);
    await jobLevel.destroy();
    return true;
  };
}
