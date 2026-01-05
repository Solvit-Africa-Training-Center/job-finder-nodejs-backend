import { Sequelize } from 'sequelize';
import { initFAQModel } from './faq.model';
import { initStaticPageModel } from './staticPage.model';
import { SampleUser, SampleUserModel } from './sampleuser';

// CV imports
import { CV, initCVModel } from './cvs.model';
import { CVVersion, initCVVersionModel } from './cvsVersion.model';

interface Models {
  FAQ: ReturnType<typeof initFAQModel>;
  StaticPage: ReturnType<typeof initStaticPageModel>;
  SampleUser: typeof SampleUser;
  CV: typeof CV;
  CVVersion: typeof CVVersion;
}

export const allModel = (sequelize: Sequelize): Models => {
  const FAQ = initFAQModel(sequelize);
  const StaticPage = initStaticPageModel(sequelize);
  const SampleUser = SampleUserModel(sequelize);

  //  initialize CV models FIRST
  initCVModel(sequelize);
  initCVVersionModel(sequelize);

  // DEFINE ASSOCIATIONS AFTER INIT (THIS IS THE FIX)
  CV.hasMany(CVVersion, {
    foreignKey: 'cvId',
    as: 'versions',
  });

  CVVersion.belongsTo(CV, {
    foreignKey: 'cvId',
    as: 'cv',
  });

  CV.belongsTo(CVVersion, {
    foreignKey: 'currentVersionId',
    as: 'currentVersion',
  });

  return {
    FAQ,
    StaticPage,
    SampleUser,
    CV,
    CVVersion,
  };
};
