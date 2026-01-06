import Joi from 'joi';

export const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(200).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title must not exceed 200 characters',
  }),
  content: Joi.string().min(10).required().messages({
    'string.empty': 'Content is required',
    'string.min': 'Content must be at least 10 characters',
  }),
  description: Joi.string().max(1000).optional(),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  content: Joi.string().min(10).optional(),
  description: Joi.string().max(1000).optional(),
}).min(1);

export const commentSchema = Joi.object({
  comment: Joi.string().min(1).max(500).required().messages({
    'string.empty': 'Comment is required',
    'string.max': 'Comment must not exceed 500 characters',
  }),
});
