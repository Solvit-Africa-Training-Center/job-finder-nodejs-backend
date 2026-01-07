import Joi from 'joi';

export const createEducationSchema = Joi.object({
  candidateProfileId: Joi.string().uuid().required(),
  institution: Joi.string().max(200).required(),
  degree: Joi.string().max(150).required(),
  fieldOfStudy: Joi.string().max(150).required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).optional(),
  isCurrent: Joi.boolean().optional(),
  grade: Joi.string().max(50).optional(),
  description: Joi.string().optional(),
});

export const updateEducationSchema = Joi.object({
  institution: Joi.string().max(200).optional(),
  degree: Joi.string().max(150).optional(),
  fieldOfStudy: Joi.string().max(150).optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
  isCurrent: Joi.boolean().optional(),
  grade: Joi.string().max(50).optional(),
  description: Joi.string().optional(),
}).min(1);

export const educationIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
