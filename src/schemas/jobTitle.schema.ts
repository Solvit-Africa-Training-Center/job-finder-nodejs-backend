import Joi from "joi";

export const createJobTitleSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow("", null),
  jobCategoryId: Joi.string().uuid().required(),
  jobLevelId: Joi.string().uuid().required(),
});

export const updateJobTitleSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().allow("", null),
  jobCategoryId: Joi.string().uuid(),
  jobLevelId: Joi.string().uuid(),
});
