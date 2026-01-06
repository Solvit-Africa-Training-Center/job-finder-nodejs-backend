import { Sequelize } from 'sequelize';
import { initFAQModel } from './faq.model';
import { initStaticPageModel } from './staticPage.model';
import { SampleUser, SampleUserModel } from './sampleuser';
import { Notification, NotificationModel } from './notification.model';
import { NotificationPreference, NotificationPreferenceModel } from './notificationPreference.model';

interface Models {
  FAQ: ReturnType<typeof initFAQModel>;
  StaticPage: ReturnType<typeof initStaticPageModel>;
  SampleUser: typeof SampleUser;
  Notification: typeof Notification;
  NotificationPreference: typeof NotificationPreference;
}

export const allModel = (sequelize: Sequelize): Models => {
  const FAQ = initFAQModel(sequelize);
  const StaticPage = initStaticPageModel(sequelize);
  const SampleUser = SampleUserModel(sequelize);
  const Notification = NotificationModel(sequelize);
  const NotificationPreference = NotificationPreferenceModel(sequelize);

  return {
    FAQ,
    StaticPage,
    SampleUser,
    Notification,
    NotificationPreference,
  };
};

export * from './sampleuser';
