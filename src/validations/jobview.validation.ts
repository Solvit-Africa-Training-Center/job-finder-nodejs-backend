import Joi from 'joi'

export const createJobViewSchema = Joi.object({
  job_id: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().optional().allow(null),
  ip_address: Joi.string().ip().required(),
  user_agent: Joi.string().optional().allow(null),
});
