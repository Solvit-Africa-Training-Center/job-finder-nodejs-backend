import { Request, Response } from 'express';
import { CandidateProfileService } from '../services';
import { asyncHandler } from '../utils';
import { AppError } from '../utils';

const candidateProfileService = new CandidateProfileService();

export class CandidateProfileController {
  createProfile = asyncHandler(async (req: Request, res: Response) => {
    const profileData = req.body;
    const profile = await candidateProfileService.createProfile(profileData);
    res.status(201).json({
      success: true,
      message: 'Candidate profile created successfully',
      data: profile,
    });
  });

  getAllProfiles = asyncHandler(async (req: Request, res: Response) => {
    const profiles = await candidateProfileService.getAllProfiles();
    res.status(200).json({
      success: true,
      message: 'Candidate profiles retrieved successfully',
      data: profiles,
      count: profiles.length,
    });
  });

  getProfileById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const profile = await candidateProfileService.getProfileById(id);

    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Candidate profile retrieved successfully',
      data: profile,
    });
  });

  getProfileByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const profile = await candidateProfileService.getProfileByUserId(userId);

    if (!profile) {
      throw new AppError('Candidate profile not found for this user', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Candidate profile retrieved successfully',
      data: profile,
    });
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const profile = await candidateProfileService.getProfileById(id);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const updatedProfile = await candidateProfileService.updateProfile(
      id,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Candidate profile updated successfully',
      data: updatedProfile,
    });
  });

  deleteProfile = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const profile = await candidateProfileService.getProfileById(id);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    await candidateProfileService.deleteProfile(id);

    res.status(200).json({
      success: true,
      message: 'Candidate profile deleted successfully',
    });
  });

  // Skill Management
  addSkill = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;
    const skillData = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const skill = await candidateProfileService.addSkill(
      candidateProfileId,
      skillData,
    );

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: skill,
    });
  });

  updateSkill = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId, skillId } = req.params;
    const updateData = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const skill = await candidateProfileService.updateSkill(
      skillId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: skill,
    });
  });

  removeSkill = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId, skillId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    await candidateProfileService.removeSkill(skillId);

    res.status(200).json({
      success: true,
      message: 'Skill removed successfully',
    });
  });

  getCandidateSkills = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const skills =
      await candidateProfileService.getCandidateSkills(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Skills retrieved successfully',
      data: skills,
      count: skills.length,
    });
  });

  // Education Management
  addEducation = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;
    const educationData = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const education = await candidateProfileService.addEducation(
      candidateProfileId,
      educationData,
    );

    res.status(201).json({
      success: true,
      message: 'Education added successfully',
      data: education,
    });
  });

  updateEducation = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId, educationId } = req.params;
    const updateData = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const education = await candidateProfileService.updateEducation(
      educationId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Education updated successfully',
      data: education,
    });
  });

  removeEducation = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId, educationId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    await candidateProfileService.removeEducation(educationId);

    res.status(200).json({
      success: true,
      message: 'Education removed successfully',
    });
  });

  getCandidateEducation = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const educations =
      await candidateProfileService.getCandidateEducation(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Educations retrieved successfully',
      data: educations,
      count: educations.length,
    });
  });

  // Experience Management
  addExperience = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;
    const experienceData = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const experience = await candidateProfileService.addExperience(
      candidateProfileId,
      experienceData,
    );

    res.status(201).json({
      success: true,
      message: 'Experience added successfully',
      data: experience,
    });
  });

  updateExperience = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId, experienceId } = req.params;
    const updateData = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const experience = await candidateProfileService.updateExperience(
      experienceId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Experience updated successfully',
      data: experience,
    });
  });

  removeExperience = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId, experienceId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    await candidateProfileService.removeExperience(experienceId);

    res.status(200).json({
      success: true,
      message: 'Experience removed successfully',
    });
  });

  getCandidateExperience = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const experiences =
      await candidateProfileService.getCandidateExperience(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Experiences retrieved successfully',
      data: experiences,
      count: experiences.length,
    });
  });

  // Jobs Management
  saveJob = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;
    const { jobId, isPinned } = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const savedJob = await candidateProfileService.saveJob(
      candidateProfileId,
      jobId,
      isPinned,
    );

    res.status(201).json({
      success: true,
      message: 'Job saved successfully',
      data: savedJob,
    });
  });

  unsaveJob = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId, jobId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    await candidateProfileService.unsaveJob(candidateProfileId, jobId);

    res.status(200).json({
      success: true,
      message: 'Job removed from saved successfully',
    });
  });

  getSavedJobs = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const savedJobs =
      await candidateProfileService.getSavedJobs(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Saved jobs retrieved successfully',
      data: savedJobs,
      count: savedJobs.length,
    });
  });

  getPinnedJobs = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const pinnedJobs =
      await candidateProfileService.getPinnedJobs(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Pinned jobs retrieved successfully',
      data: pinnedJobs,
      count: pinnedJobs.length,
    });
  });

  applyForJob = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;
    const { jobId, appliedDate } = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const appliedJob = await candidateProfileService.applyForJob(
      candidateProfileId,
      jobId,
      appliedDate,
    );

    res.status(201).json({
      success: true,
      message: 'Job application submitted successfully',
      data: appliedJob,
    });
  });

  getAppliedJobs = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const appliedJobs =
      await candidateProfileService.getAppliedJobs(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Applied jobs retrieved successfully',
      data: appliedJobs,
      count: appliedJobs.length,
    });
  });

  updateApplicationStatus = asyncHandler(
    async (req: Request, res: Response) => {
      const { candidateProfileId, jobId } = req.params;
      const { status } = req.body;

      const profile =
        await candidateProfileService.getProfileById(candidateProfileId);
      if (!profile) {
        throw new AppError('Candidate profile not found', 404);
      }

      const updatedJob = await candidateProfileService.updateApplicationStatus(
        candidateProfileId,
        jobId,
        status,
      );

      res.status(200).json({
        success: true,
        message: 'Application status updated successfully',
        data: updatedJob,
      });
    },
  );

  // Job Offers Management
  createOffer = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;
    const offerData = req.body;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const offer = await candidateProfileService.createOffer({
      candidateProfileId,
      ...offerData,
    });

    res.status(201).json({
      success: true,
      message: 'Job offer created successfully',
      data: offer,
    });
  });

  getOffers = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const offers = await candidateProfileService.getOffers(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Job offers retrieved successfully',
      data: offers,
      count: offers.length,
    });
  });

  getOfferById = asyncHandler(async (req: Request, res: Response) => {
    const { offerId } = req.params;

    const offer = await candidateProfileService.getOfferById(offerId);

    if (!offer) {
      throw new AppError('Job offer not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Job offer retrieved successfully',
      data: offer,
    });
  });

  updateOffer = asyncHandler(async (req: Request, res: Response) => {
    const { offerId } = req.params;
    const updateData = req.body;

    const offer = await candidateProfileService.getOfferById(offerId);

    if (!offer) {
      throw new AppError('Job offer not found', 404);
    }

    const updatedOffer = await candidateProfileService.updateOffer(
      offerId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Job offer updated successfully',
      data: updatedOffer,
    });
  });

  updateOfferStatus = asyncHandler(async (req: Request, res: Response) => {
    const { offerId } = req.params;
    const { status } = req.body;

    const offer = await candidateProfileService.getOfferById(offerId);

    if (!offer) {
      throw new AppError('Job offer not found', 404);
    }

    const updatedOffer = await candidateProfileService.updateOfferStatus(
      offerId,
      status,
    );

    res.status(200).json({
      success: true,
      message: 'Offer status updated successfully',
      data: updatedOffer,
    });
  });

  deleteOffer = asyncHandler(async (req: Request, res: Response) => {
    const { offerId } = req.params;

    const offer = await candidateProfileService.getOfferById(offerId);

    if (!offer) {
      throw new AppError('Job offer not found', 404);
    }

    await candidateProfileService.deleteOffer(offerId);

    res.status(200).json({
      success: true,
      message: 'Job offer deleted successfully',
    });
  });

  getAcceptedOffers = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const offers =
      await candidateProfileService.getAcceptedOffers(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Accepted offers retrieved successfully',
      data: offers,
      count: offers.length,
    });
  });

  getPendingOffers = asyncHandler(async (req: Request, res: Response) => {
    const { candidateProfileId } = req.params;

    const profile =
      await candidateProfileService.getProfileById(candidateProfileId);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const offers =
      await candidateProfileService.getPendingOffers(candidateProfileId);

    res.status(200).json({
      success: true,
      message: 'Pending offers retrieved successfully',
      data: offers,
      count: offers.length,
    });
  });
}
