import { Sequelize } from "sequelize";
import jobcategoryinit, { JobCategory } from "./jobcategory";



interface Models {JobCategory: typeof JobCategory }
export const allModel = (sequelize: Sequelize) => {
   
  return { JobCategory: jobcategoryinit(sequelize) };

};