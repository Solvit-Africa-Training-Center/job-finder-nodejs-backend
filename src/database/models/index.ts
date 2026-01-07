import { Sequelize } from 'sequelize';
import { initFAQModel } from './faq.model';
import { initStaticPageModel } from './staticPage.model';
import { SampleUser, SampleUserModel } from './sampleuser';
import {
  EmailVerificationToken,
  initEmailVerficationTokenModel,
} from './emailVerificationToken';
import {
  initPasswordResetTokenModel,
  PasswordResetToken,
} from './passwordResetToken';

interface Models {
  FAQ: ReturnType<typeof initFAQModel>;
  StaticPage: ReturnType<typeof initStaticPageModel>;
  SampleUser: typeof SampleUser;
  EmailVerficationToken: typeof EmailVerificationToken;
  PasswordResetToken: typeof PasswordResetToken;
}

export const allModel = (sequelize: Sequelize): Models => {
  const FAQ = initFAQModel(sequelize);
  const StaticPage = initStaticPageModel(sequelize);
  const SampleUser = SampleUserModel(sequelize);
  const EmailVerficationToken = initEmailVerficationTokenModel(sequelize);
  const PasswordResetToken = initPasswordResetTokenModel(sequelize);
  return {
    FAQ,
    StaticPage,
    SampleUser,
    EmailVerficationToken,
    PasswordResetToken,
  };
};
