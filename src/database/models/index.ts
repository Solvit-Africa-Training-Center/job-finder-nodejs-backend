import { JobViewInit } from './jobview';
import { initJobModel } from './job';

export const allModel = (sequelize: any) => {
  return {
    JobView: JobViewInit(sequelize),
    Job: initJobModel(sequelize),
  };
};
