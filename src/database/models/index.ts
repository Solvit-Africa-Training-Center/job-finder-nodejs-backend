import { Sequelize } from 'sequelize';
import { initFAQModel } from './faq.model';
import { initStaticPageModel } from './staticPage.model';
import { SampleUser, SampleUserModel } from './sampleuser';
import {
  EmailVerificationToken,
  initEmailVerificationTokenModel,
} from './EmailVerificationToken';

interface Models {
  FAQ: ReturnType<typeof initFAQModel>;
  StaticPage: ReturnType<typeof initStaticPageModel>;
  SampleUser: typeof SampleUser;
  EmailVerificationToken: typeof EmailVerificationToken;
}

export const allModel = (sequelize: Sequelize): Models => {
  const FAQ = initFAQModel(sequelize);
  const StaticPage = initStaticPageModel(sequelize);
  const SampleUser = SampleUserModel(sequelize);
  const EmailVerificationToken = initEmailVerificationTokenModel(sequelize);

  return {
    FAQ,
    StaticPage,
    SampleUser,
    EmailVerificationToken,
  };
};
