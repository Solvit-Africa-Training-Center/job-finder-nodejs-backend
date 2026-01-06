import express, { Router } from 'express';
import { CandidateProfileController } from '../controllers';

const candidateRoute: Router = express.Router();
const candidateController = new CandidateProfileController();

// Candidate Profile CRUD Routes
candidateRoute.post('/', candidateController.createProfile);
candidateRoute.get('/', candidateController.getAllProfiles);
candidateRoute.get('/profile/:id', candidateController.getProfileById);
candidateRoute.get('/user/:userId', candidateController.getProfileByUserId);
candidateRoute.patch('/:id', candidateController.updateProfile);
candidateRoute.delete('/:id', candidateController.deleteProfile);

// Skills Management Routes
candidateRoute.post(
  '/:candidateProfileId/skills',
  candidateController.addSkill,
);
candidateRoute.get(
  '/:candidateProfileId/skills',
  candidateController.getCandidateSkills,
);
candidateRoute.patch(
  '/:candidateProfileId/skills/:skillId',
  candidateController.updateSkill,
);
candidateRoute.delete(
  '/:candidateProfileId/skills/:skillId',
  candidateController.removeSkill,
);

// Education Management Routes
candidateRoute.post(
  '/:candidateProfileId/education',
  candidateController.addEducation,
);
candidateRoute.get(
  '/:candidateProfileId/education',
  candidateController.getCandidateEducation,
);
candidateRoute.patch(
  '/:candidateProfileId/education/:educationId',
  candidateController.updateEducation,
);
candidateRoute.delete(
  '/:candidateProfileId/education/:educationId',
  candidateController.removeEducation,
);

// Experience Management Routes
candidateRoute.post(
  '/:candidateProfileId/experience',
  candidateController.addExperience,
);
candidateRoute.get(
  '/:candidateProfileId/experience',
  candidateController.getCandidateExperience,
);
candidateRoute.patch(
  '/:candidateProfileId/experience/:experienceId',
  candidateController.updateExperience,
);
candidateRoute.delete(
  '/:candidateProfileId/experience/:experienceId',
  candidateController.removeExperience,
);

// Jobs Management Routes
candidateRoute.post(
  '/:candidateProfileId/jobs/save',
  candidateController.saveJob,
);
candidateRoute.delete(
  '/:candidateProfileId/jobs/:jobId/save',
  candidateController.unsaveJob,
);
candidateRoute.get(
  '/:candidateProfileId/jobs/saved',
  candidateController.getSavedJobs,
);
candidateRoute.get(
  '/:candidateProfileId/jobs/pinned',
  candidateController.getPinnedJobs,
);
candidateRoute.post(
  '/:candidateProfileId/jobs/apply',
  candidateController.applyForJob,
);
candidateRoute.get(
  '/:candidateProfileId/jobs/applied',
  candidateController.getAppliedJobs,
);
candidateRoute.patch(
  '/:candidateProfileId/jobs/:jobId/status',
  candidateController.updateApplicationStatus,
);

// Job Offers Management Routes
candidateRoute.post(
  '/:candidateProfileId/offers',
  candidateController.createOffer,
);
candidateRoute.get(
  '/:candidateProfileId/offers',
  candidateController.getOffers,
);
candidateRoute.get('/offers/:offerId', candidateController.getOfferById);
candidateRoute.patch('/offers/:offerId', candidateController.updateOffer);
candidateRoute.patch(
  '/offers/:offerId/status',
  candidateController.updateOfferStatus,
);
candidateRoute.delete('/offers/:offerId', candidateController.deleteOffer);
candidateRoute.get(
  '/:candidateProfileId/offers/accepted',
  candidateController.getAcceptedOffers,
);
candidateRoute.get(
  '/:candidateProfileId/offers/pending',
  candidateController.getPendingOffers,
);

export default candidateRoute;
