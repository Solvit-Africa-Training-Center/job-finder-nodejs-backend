import {
  CandidateProfile,
  CandidateProfileAttributes,
} from '../database/models/candidateProfile.model';
import {
  Education,
  EducationAttributes,
} from '../database/models/education.model';
import {
  Experience,
  ExperienceAttributes,
} from '../database/models/experience.model';
import {
  CandidateSkill,
  CandidateSkillAttributes,
} from '../database/models/candidateSkill.model';
import { Skill } from '../database/models/skill.model';
import { SavedJob } from '../database/models/savedJob.model';
import {
  JobOffer,
  JobOfferAttributes,
} from '../database/models/jobOffer.model';
import { Optional } from 'sequelize';

export class CandidateProfileService {
  // Candidate Profile CRUD
  createProfile = async (
    profileData: Optional<
      CandidateProfileAttributes,
      'id' | 'profilePictureUrl' | 'bio' | 'headline' | 'location' | 'resumeUrl'
    >,
  ) => {
    return await CandidateProfile.create(profileData);
  };

  getAllProfiles = async () => {
    return await CandidateProfile.findAll({
      include: [
        { model: CandidateSkill, include: [{ model: Skill }] },
        { model: Education },
        { model: Experience },
        { model: SavedJob },
        { model: JobOffer },
      ],
    });
  };

  getProfileById = async (id: string) => {
    return await CandidateProfile.findByPk(id, {
      include: [
        { model: CandidateSkill, include: [{ model: Skill }] },
        { model: Education },
        { model: Experience },
        { model: SavedJob },
        { model: JobOffer },
      ],
    });
  };

  getProfileByUserId = async (userId: string) => {
    return await CandidateProfile.findOne({
      where: { userId },
      include: [
        { model: CandidateSkill, include: [{ model: Skill }] },
        { model: Education },
        { model: Experience },
        { model: SavedJob },
        { model: JobOffer },
      ],
    });
  };

  updateProfile = async (
    id: string,
    updateData: Partial<CandidateProfileAttributes>,
  ) => {
    await CandidateProfile.update(updateData, { where: { id } });
    return this.getProfileById(id);
  };

  deleteProfile = async (id: string) => {
    return await CandidateProfile.destroy({ where: { id } });
  };

  // Skill Management
  addSkill = async (
    candidateProfileId: string,
    skillData: Optional<CandidateSkillAttributes, 'id' | 'yearsOfExperience'>,
  ) => {
    return await CandidateSkill.create({
      candidateProfileId,
      ...skillData,
    });
  };

  updateSkill = async (
    candidateSkillId: string,
    updateData: Partial<CandidateSkillAttributes>,
  ) => {
    await CandidateSkill.update(updateData, {
      where: { id: candidateSkillId },
    });
    return await CandidateSkill.findByPk(candidateSkillId, {
      include: [{ model: Skill }],
    });
  };

  removeSkill = async (candidateSkillId: string) => {
    return await CandidateSkill.destroy({ where: { id: candidateSkillId } });
  };

  getCandidateSkills = async (candidateProfileId: string) => {
    return await CandidateSkill.findAll({
      where: { candidateProfileId },
      include: [{ model: Skill }],
    });
  };

  // Education Management
  addEducation = async (
    candidateProfileId: string,
    educationData: Optional<
      EducationAttributes,
      'id' | 'endDate' | 'grade' | 'description'
    >,
  ) => {
    return await Education.create({
      candidateProfileId,
      ...educationData,
    });
  };

  updateEducation = async (
    educationId: string,
    updateData: Partial<EducationAttributes>,
  ) => {
    await Education.update(updateData, { where: { id: educationId } });
    return await Education.findByPk(educationId);
  };

  removeEducation = async (educationId: string) => {
    return await Education.destroy({ where: { id: educationId } });
  };

  getCandidateEducation = async (candidateProfileId: string) => {
    return await Education.findAll({
      where: { candidateProfileId },
      order: [['startDate', 'DESC']],
    });
  };

  // Experience Management
  addExperience = async (
    candidateProfileId: string,
    experienceData: Optional<
      ExperienceAttributes,
      'id' | 'location' | 'endDate' | 'description'
    >,
  ) => {
    return await Experience.create({
      candidateProfileId,
      ...experienceData,
    });
  };

  updateExperience = async (
    experienceId: string,
    updateData: Partial<ExperienceAttributes>,
  ) => {
    await Experience.update(updateData, { where: { id: experienceId } });
    return await Experience.findByPk(experienceId);
  };

  removeExperience = async (experienceId: string) => {
    return await Experience.destroy({ where: { id: experienceId } });
  };

  getCandidateExperience = async (candidateProfileId: string) => {
    return await Experience.findAll({
      where: { candidateProfileId },
      order: [['startDate', 'DESC']],
    });
  };

  // Saved & Applied Jobs Management
  saveJob = async (
    candidateProfileId: string,
    jobId: string,
    isPinned: boolean = false,
  ) => {
    const existing = await SavedJob.findOne({
      where: { candidateProfileId, jobId },
    });

    if (existing) {
      await existing.update({ isPinned });
      return existing;
    }

    return await SavedJob.create({
      candidateProfileId,
      jobId,
      isPinned,
    });
  };

  unsaveJob = async (candidateProfileId: string, jobId: string) => {
    return await SavedJob.destroy({
      where: { candidateProfileId, jobId },
    });
  };

  getSavedJobs = async (candidateProfileId: string) => {
    return await SavedJob.findAll({
      where: { candidateProfileId },
      order: [['createdAt', 'DESC']],
    });
  };

  getPinnedJobs = async (candidateProfileId: string) => {
    return await SavedJob.findAll({
      where: { candidateProfileId, isPinned: true },
      order: [['createdAt', 'DESC']],
    });
  };

  applyForJob = async (
    candidateProfileId: string,
    jobId: string,
    appliedDate: Date = new Date(),
  ) => {
    const existing = await SavedJob.findOne({
      where: { candidateProfileId, jobId },
    });

    if (existing) {
      await existing.update({
        applicationStatus: 'applied',
        appliedDate,
      });
      return existing;
    }

    return await SavedJob.create({
      candidateProfileId,
      jobId,
      applicationStatus: 'applied',
      appliedDate,
    });
  };

  getAppliedJobs = async (candidateProfileId: string) => {
    return await SavedJob.findAll({
      where: {
        candidateProfileId,
        applicationStatus: 'applied',
      },
      order: [['appliedDate', 'DESC']],
    });
  };

  updateApplicationStatus = async (
    candidateProfileId: string,
    jobId: string,
    status:
      | 'applied'
      | 'rejected'
      | 'accepted'
      | 'offer_received'
      | 'not_applied',
  ) => {
    const savedJob = await SavedJob.findOne({
      where: { candidateProfileId, jobId },
    });

    if (!savedJob) {
      throw new Error('Saved job not found');
    }

    await savedJob.update({ applicationStatus: status });
    return savedJob;
  };

  // Job Offer Management
  createOffer = async (
    offerData: Optional<
      JobOfferAttributes,
      'id' | 'salary' | 'currency' | 'expiryDate' | 'terms' | 'notes'
    >,
  ) => {
    return await JobOffer.create(offerData);
  };

  getOffers = async (candidateProfileId: string) => {
    return await JobOffer.findAll({
      where: { candidateProfileId },
      order: [['offerDate', 'DESC']],
    });
  };

  getOfferById = async (offerId: string) => {
    return await JobOffer.findByPk(offerId);
  };

  updateOffer = async (
    offerId: string,
    updateData: Partial<JobOfferAttributes>,
  ) => {
    await JobOffer.update(updateData, { where: { id: offerId } });
    return await JobOffer.findByPk(offerId);
  };

  updateOfferStatus = async (
    offerId: string,
    status: 'pending' | 'accepted' | 'rejected' | 'expired',
  ) => {
    await JobOffer.update({ offerStatus: status }, { where: { id: offerId } });
    return await JobOffer.findByPk(offerId);
  };

  deleteOffer = async (offerId: string) => {
    return await JobOffer.destroy({ where: { id: offerId } });
  };

  getAcceptedOffers = async (candidateProfileId: string) => {
    return await JobOffer.findAll({
      where: { candidateProfileId, offerStatus: 'accepted' },
      order: [['offerDate', 'DESC']],
    });
  };

  getPendingOffers = async (candidateProfileId: string) => {
    return await JobOffer.findAll({
      where: { candidateProfileId, offerStatus: 'pending' },
      order: [['offerDate', 'DESC']],
    });
  };
}
