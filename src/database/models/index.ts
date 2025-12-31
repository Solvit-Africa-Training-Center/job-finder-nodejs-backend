import { Sequelize } from "sequelize";
import jobcategoryinit, { JobCategory } from "./jobcategory";
import joblevelinit, { JobLevel } from "./joblevel";
import jobtitleinit, { JobTitle } from "./jobtitle";



interface Models {JobCategory: typeof JobCategory, JobLevel: typeof JobLevel, JobTitle: typeof JobTitle}
export const allModel = (sequelize: Sequelize) => {
   
  return { JobCategory: jobcategoryinit(sequelize), JobLevel: joblevelinit(sequelize), JobTitle: jobtitleinit(sequelize) };

};