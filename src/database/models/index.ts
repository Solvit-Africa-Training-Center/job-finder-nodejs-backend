import { Sequelize } from "sequelize";
import SampleUserModelInit from "./sampleuser";

export const allModel = (sequelize: Sequelize) => {
  const sampleUser = SampleUserModelInit(sequelize);
  return { SampleUser: sampleUser };
};
