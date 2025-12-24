import { Sequelize } from "sequelize";
import jobcategoryinit from "./jobcategory";

export const allModel = (sequelize: Sequelize) => {
  const jobcategory = jobcategoryinit(sequelize);
  return { JobCategory: jobcategory };
};