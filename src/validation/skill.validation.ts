import Joi from 'joi';

export const createSkillSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    'string.max': 'Skill name must not exceed 100 characters',
    'any.required': 'Skill name is required',
  }),
  category: Joi.string().max(100).optional(),
  isActive: Joi.boolean().optional(),
});

export const updateSkillSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  category: Joi.string().max(100).optional(),
  isActive: Joi.boolean().optional(),
}).min(1);

export const skillIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const searchSkillSchema = Joi.object({
  q: Joi.string().min(1).required().messages({
    'string.min': 'Search query must not be empty',
    'any.required': 'Search query is required',
  }),
});
