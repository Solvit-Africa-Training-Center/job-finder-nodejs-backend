import Joi from 'joi';
import { EmploymentType } from '../database/models';

export const createExperienceSchema = Joi.object({
  candidateProfileId: Joi.string().uuid().required(),
  companyName: Joi.string().max(200).required(),
  jobTitle: Joi.string().max(150).required(),
  employmentType: Joi.string()
    .valid(...Object.values(EmploymentType))
    .required(),
  location: Joi.string().max(200).optional(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).optional(),
  isCurrent: Joi.boolean().optional(),
  description: Joi.string().optional(),
  achievements: Joi.string().optional(),
});

export const updateExperienceSchema = Joi.object({
  companyName: Joi.string().max(200).optional(),
  jobTitle: Joi.string().max(150).optional(),
  employmentType: Joi.string()
    .valid(...Object.values(EmploymentType))
    .optional(),
  location: Joi.string().max(200).optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
  isCurrent: Joi.boolean().optional(),
  description: Joi.string().optional(),
  achievements: Joi.string().optional(),
}).min(1);

export const experienceIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
