import { JobCategory } from "../database/models/jobcategory";

export class JobCategoryService {
  
  create = async (data: {
    name: string;
    industry: string;
    description?: string;
    parent_id?: string;
  }) => {
    return await JobCategory.create(data);
  };

  
  fetchAll = async () => {
    return await JobCategory.findAll({
      // include: [
      //   {
      //     model: JobCategory,
      //     as: "parent",
      //   },
      //   {
      //     model: JobCategory,
      //     as: "children",
      //   },
      // ],
      // order: [["createdAt", "DESC"]],
    });
  };

  
  fetchById = async (id: string) => {
    const category = await JobCategory.findByPk(id, {
      include: [
        {
          model: JobCategory,
          as: "parent",
        },
        {
          model: JobCategory,
          as: "children",
        },
      ],
    });

    if (!category) {
      throw new Error("Job category not found");
    }

    return category;
  };

  
  update = async (
    id: string,
    data: {
      name?: string;
      industry?: string;
      description?: string;
      parent_id?: string;
    }
  ) => {
    const category = await this.fetchById(id);
    await category.update(data);
    return category;
  };

  
  delete = async (id: string) => {
    const category = await this.fetchById(id);
    await category.destroy();
    return true;
  };
}
