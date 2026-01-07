import express, { Router } from 'express';
import { CandidateSkillController } from '../controllers';

const candidateSkillRouter: Router = express.Router();
const candidateSkillController = new CandidateSkillController();

candidateSkillRouter.post('/', candidateSkillController.addSkill);
candidateSkillRouter.get('/', candidateSkillController.getCandidateSkills);
candidateSkillRouter.get(
  '/featured',
  candidateSkillController.getFeaturedSkills,
);
candidateSkillRouter.patch('/', candidateSkillController.updateCandidateSkill);
candidateSkillRouter.patch(
  '/toggle-featured',
  candidateSkillController.toggleFeatured,
);
candidateSkillRouter.delete('/', candidateSkillController.deleteCandidateSkill);

export default candidateSkillRouter;
