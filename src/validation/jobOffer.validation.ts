import Joi from 'joi';
import { JobOfferStatus } from '../database/models';

export const createJobOfferSchema = Joi.object({
  candidateProfileId: Joi.string().uuid().required(),
  jobId: Joi.string().uuid().required(),
  recruiterId: Joi.string().uuid().required(),
  offeredSalary: Joi.number().positive().precision(2).optional(),
  offerDate: Joi.date().iso().required(),
  expiryDate: Joi.date().iso().min(Joi.ref('offerDate')).optional(),
  status: Joi.string()
    .valid(...Object.values(JobOfferStatus))
    .optional(),
  offerLetter: Joi.string().max(500).optional(),
  notes: Joi.string().optional(),
});

export const updateJobOfferSchema = Joi.object({
  offeredSalary: Joi.number().positive().precision(2).optional(),
  offerDate: Joi.date().iso().optional(),
  expiryDate: Joi.date().iso().optional(),
  status: Joi.string()
    .valid(...Object.values(JobOfferStatus))
    .optional(),
  offerLetter: Joi.string().max(500).optional(),
  notes: Joi.string().optional(),
}).min(1);

export const updateJobOfferStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(JobOfferStatus))
    .required(),
});

export const jobOfferIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
