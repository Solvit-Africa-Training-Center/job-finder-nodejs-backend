import Joi from 'joi';
import { ProficiencyLevel } from '../database/models';

export const addCandidateSkillSchema = Joi.object({
  candidateProfileId: Joi.string().uuid().required(),
  skillId: Joi.string().uuid().required(),
  proficiencyLevel: Joi.string()
    .valid(...Object.values(ProficiencyLevel))
    .required(),
  yearsOfExperience: Joi.number().integer().min(0).max(100).optional(),
  isFeatured: Joi.boolean().optional(),
});

export const updateCandidateSkillSchema = Joi.object({
  proficiencyLevel: Joi.string()
    .valid(...Object.values(ProficiencyLevel))
    .optional(),
  yearsOfExperience: Joi.number().integer().min(0).max(100).optional(),
  isFeatured: Joi.boolean().optional(),
}).min(1);

export const candidateSkillIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const candidateIdParamSchema = Joi.object({
  candidateId: Joi.string().uuid().required(),
});
