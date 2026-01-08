import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base':
        'Password must contain uppercase, lowercase, and numbers',
      'any.required': 'Password is required',
    }),

  firstName: Joi.string().trim().max(50).optional(),
  lastName: Joi.string().trim().max(50).optional(),
})
  .required()
  .unknown(false);

export const updateUserAccountSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isActive: Joi.boolean().optional(),
})
  .min(1)
  .required()
  .unknown(false);

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().trim().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  username: Joi.string().alphanum().min(3).max(30).optional().messages({
    'string.alphanum': 'Username must contain only alphanumeric characters',
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username must not exceed 30 characters',
  }),
  profilePicture: Joi.string().uri().optional(),
})
  .min(1)
  .required()
  .unknown(false);

export const updateRoleSchema = Joi.object({
  role: Joi.string()
    .valid('admin', 'recruiter', 'candidate')
    .required()
    .messages({
      'any.only': 'Role must be one of: admin, recruiter, candidate',
      'any.required': 'Role is required',
    }),
})
  .required()
  .unknown(false);

export const paginationSchema = Joi.object({
  limit: Joi.number().min(1).max(100).default(10),
  offset: Joi.number().min(0).default(0),
})
  .required()
  .unknown(false);
