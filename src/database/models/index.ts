import { Sequelize } from 'sequelize';
import { SampleUser, SampleUserModel } from './sampleuser';

interface Models {
  SampleUser: typeof SampleUser;
}

export const allModel = (sequelize: Sequelize): Models => {
  return { SampleUser: SampleUserModel(sequelize) };
};
