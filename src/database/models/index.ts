import { Sequelize } from 'sequelize';
import { initFAQModel } from './faq.model';
import { initStaticPageModel } from './staticPage.model';
import { SampleUser, SampleUserModel } from './sampleuser';
import { UserProfile, initUserProfileModel } from './userprofile.model';
import {
  UserActivityLog,
  initUserActivityLogModel,
} from './useractivitylog.model';

export interface Models {
  FAQ: ReturnType<typeof initFAQModel>;
  StaticPage: ReturnType<typeof initStaticPageModel>;
  SampleUser: typeof SampleUser;
  UserProfile: typeof UserProfile;
  UserActivityLog: typeof UserActivityLog;
}

export const allModel = (sequelize: Sequelize): Models => {
  const FAQ = initFAQModel(sequelize);
  const StaticPage = initStaticPageModel(sequelize);
  const SampleUser = SampleUserModel(sequelize);
  const UserProfile = initUserProfileModel(sequelize);
  const UserActivityLog = initUserActivityLogModel(sequelize);

  return {
    FAQ,
    StaticPage,
    SampleUser,
    UserProfile,
    UserActivityLog,
  };
};

export * from './sampleuser';
