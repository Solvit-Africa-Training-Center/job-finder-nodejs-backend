import { Sequelize } from 'sequelize';
import { initFAQModel } from './faq.model';
import { initStaticPageModel } from './staticPage.model';
import { SampleUser, SampleUserModel } from './sampleuser';
import { initConversationModel } from './Conversation';
import { initMessageModel } from './Message';


interface Models {
  FAQ: ReturnType<typeof initFAQModel>;
  StaticPage: ReturnType<typeof initStaticPageModel>;
  SampleUser: typeof SampleUser;
  Conversation: ReturnType<typeof initConversationModel>;
  Message: ReturnType<typeof initMessageModel>;
}

export const allModel = (sequelize: Sequelize): Models => {
  const FAQ = initFAQModel(sequelize);
  const StaticPage = initStaticPageModel(sequelize);
  const SampleUser = SampleUserModel(sequelize);
  const Conversation = initConversationModel(sequelize);
  const Message = initMessageModel(sequelize);

  return {
    FAQ,
    StaticPage,
    SampleUser,
    Conversation,
    Message
  };
};

export * from './sampleuser';
