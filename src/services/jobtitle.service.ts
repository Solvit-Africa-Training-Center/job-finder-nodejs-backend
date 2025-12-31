import { JobTitle } from "../database/models/jobtitle";
import { JobCategory } from "../database/models/jobcategory";
import { JobLevel } from "../database/models/joblevel";

export class JobTitleService {
  
  create = async (data: {
    name: string;
    description?: string;
    jobCategoryId: string;
    jobLevelId: string;
  }) => {
    return await JobTitle.create(data);
  };

  
  fetchAll = async () => {
    return await JobTitle.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: JobCategory,
          as: "category",
        },
        {
          model: JobLevel,
          as: "level",
        },
      ],
    });
  };

  
  fetchById = async (id: string) => {
    const jobTitle = await JobTitle.findByPk(id, {
      include: [
        {
          model: JobCategory,
          as: "category",
        },
        {
          model: JobLevel,
          as: "level",
        },
      ],
    });

    if (!jobTitle) {
      throw new Error("Job title not found");
    }

    return jobTitle;
  };

  
  update = async (
    id: string,
    data: {
      name?: string;
      description?: string;
      jobCategoryId?: string;
      jobLevelId?: string;
    }
  ) => {
    const jobTitle = await this.fetchById(id);
    await jobTitle.update(data);
    return jobTitle;
  };

  
  delete = async (id: string) => {
    const jobTitle = await this.fetchById(id);
    await jobTitle.destroy();
    return true;
  };
}
