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

  CandidateProfile.hasMany(Education, {
    foreignKey: 'candidateProfileId',
    as: 'education',
  });
  Education.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
    as: 'candidateProfile',
  });

  CandidateProfile.hasMany(Experience, {
    foreignKey: 'candidateProfileId',
    as: 'experience',
  });
  Experience.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
    as: 'candidateProfile',
  });

  CandidateProfile.hasMany(CandidateSkill, {
    foreignKey: 'candidateProfileId',
    as: 'candidateSkills',
  });
  CandidateSkill.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
    as: 'candidateProfile',
  });

  Skill.hasMany(CandidateSkill, {
    foreignKey: 'skillId',
    as: 'candidateSkills',
  });
  CandidateSkill.belongsTo(Skill, {
    foreignKey: 'skillId',
    as: 'skill',
  });

  CandidateProfile.hasMany(SavedJob, {
    foreignKey: 'candidateProfileId',
    as: 'savedJobs',
  });
  SavedJob.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
    as: 'candidateProfile',
  });

  CandidateProfile.hasMany(JobOffer, {
    foreignKey: 'candidateProfileId',
    as: 'jobOffers',
  });
  JobOffer.belongsTo(CandidateProfile, {
    foreignKey: 'candidateProfileId',
    as: 'candidateProfile',
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

export * from './sampleuser';
export * from './candidateProfile.model';
export * from './skill.model';
export * from './candidateSkill.model';
export * from './education.model';
export * from './experience.model';
export * from './savedJob.model';
export * from './jobOffer.model';
export * from './enums';
