import { Sequelize } from 'sequelize';
import { initFAQModel } from './faq.model';
import { initStaticPageModel } from './staticPage.model';
import { SampleUser, SampleUserModel } from './sampleuser';
import { initCandidateProfileModel } from './candidateProfile.model';
import { initSkillModel } from './skill.model';
import { initCandidateSkillModel } from './candidateSkill.model';
import { initEducationModel } from './education.model';
import { initExperienceModel } from './experience.model';
import { initSavedJobModel } from './savedJob.model';
import { initJobOfferModel } from './jobOffer.model';

interface Models {
  FAQ: ReturnType<typeof initFAQModel>;
  StaticPage: ReturnType<typeof initStaticPageModel>;
  SampleUser: typeof SampleUser;
  CandidateProfile: ReturnType<typeof initCandidateProfileModel>;
  Skill: ReturnType<typeof initSkillModel>;
  CandidateSkill: ReturnType<typeof initCandidateSkillModel>;
  Education: ReturnType<typeof initEducationModel>;
  Experience: ReturnType<typeof initExperienceModel>;
  SavedJob: ReturnType<typeof initSavedJobModel>;
  JobOffer: ReturnType<typeof initJobOfferModel>;
}

export const allModel = (sequelize: Sequelize): Models => {
  const FAQ = initFAQModel(sequelize);
  const StaticPage = initStaticPageModel(sequelize);
  const SampleUser = SampleUserModel(sequelize);
  const CandidateProfile = initCandidateProfileModel(sequelize);
  const Skill = initSkillModel(sequelize);
  const CandidateSkill = initCandidateSkillModel(sequelize);
  const Education = initEducationModel(sequelize);
  const Experience = initExperienceModel(sequelize);
  const SavedJob = initSavedJobModel(sequelize);
  const JobOffer = initJobOfferModel(sequelize);

  // Setup associations
  CandidateProfile.hasMany(CandidateSkill, {
    foreignKey: 'candidateProfileId',
  });
  CandidateSkill.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
  });

  CandidateSkill.belongsTo(Skill, { foreignKey: 'skillId' });
  Skill.hasMany(CandidateSkill, { foreignKey: 'skillId' });

  CandidateProfile.hasMany(Education, {
    foreignKey: 'candidateProfileId',
  });
  Education.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
  });

  CandidateProfile.hasMany(Experience, {
    foreignKey: 'candidateProfileId',
  });
  Experience.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
  });

  CandidateProfile.hasMany(SavedJob, {
    foreignKey: 'candidateProfileId',
  });
  SavedJob.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
  });

  CandidateProfile.hasMany(JobOffer, {
    foreignKey: 'candidateProfileId',
  });
  JobOffer.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
  });

  return {
    FAQ,
    StaticPage,
    SampleUser,
    CandidateProfile,
    Skill,
    CandidateSkill,
    Education,
    Experience,
    SavedJob,
    JobOffer,
  };
};
