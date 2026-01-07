import Joi from 'joi';

export const saveJobSchema = Joi.object({
  candidateProfileId: Joi.string().uuid().required(),
  jobId: Joi.string().uuid().required(),
  notes: Joi.string().optional(),
});

export const savedJobIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const checkSavedJobSchema = Joi.object({
  candidateId: Joi.string().uuid().required(),
  jobId: Joi.string().uuid().required(),
});
