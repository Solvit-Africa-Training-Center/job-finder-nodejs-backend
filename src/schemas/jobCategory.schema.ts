import Joi from "joi";

export const createJobCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  industry: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow("", null),
  parentId: Joi.string().uuid().allow(null),
});

export const updateJobCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100),
  industry: Joi.string().min(2).max(100),
  description: Joi.string().allow("", null),
  parentId: Joi.string().uuid().allow(null),
});
