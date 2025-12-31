import Joi from "joi";

export const createJobLevelSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().allow("", null),
});

export const updateJobLevelSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  description: Joi.string().allow("", null),
});
