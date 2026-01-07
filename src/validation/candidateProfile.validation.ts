import Joi from 'joi';
import { Gender, Availability } from '../database/models';

export const createCandidateProfileSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    'string.guid': 'userId must be a valid UUID',
    'any.required': 'userId is required',
  }),
  phoneNumber: Joi.string().max(20).optional(),
  dateOfBirth: Joi.date().iso().max('now').optional(),
  gender: Joi.string()
    .valid(...Object.values(Gender))
    .optional(),
  address: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  country: Joi.string().max(100).optional(),
  bio: Joi.string().optional(),
  linkedinUrl: Joi.string().uri().max(255).optional(),
  portfolioUrl: Joi.string().uri().max(255).optional(),
  githubUrl: Joi.string().uri().max(255).optional(),
  expectedSalary: Joi.number().positive().precision(2).optional(),
  availability: Joi.string()
    .valid(...Object.values(Availability))
    .optional(),
});

export const updateCandidateProfileSchema = Joi.object({
  phoneNumber: Joi.string().max(20).optional(),
  dateOfBirth: Joi.date().iso().max('now').optional(),
  gender: Joi.string()
    .valid(...Object.values(Gender))
    .optional(),
  address: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  country: Joi.string().max(100).optional(),
  bio: Joi.string().optional(),
  linkedinUrl: Joi.string().uri().max(255).optional(),
  portfolioUrl: Joi.string().uri().max(255).optional(),
  githubUrl: Joi.string().uri().max(255).optional(),
  expectedSalary: Joi.number().positive().precision(2).optional(),
  availability: Joi.string()
    .valid(...Object.values(Availability))
    .optional(),
}).min(1);

export const candidateProfileIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const userIdSchema = Joi.object({
  userId: Joi.string().uuid().required(),
});
