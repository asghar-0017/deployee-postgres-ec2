const Joi = require('joi');

const ValidateWebBasicPlan = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({ tlds: { allow: true } })  // Enable basic email validation
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  company: Joi.string().optional(),
  reference_sites: Joi.string().optional(),
  Link_to_Graphics:Joi.array().optional(),
  description:Joi.string().required()
});

const ValidateWebStandardPlan = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({ tlds: { allow: true } })  // Enable basic email validation
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  company: Joi.string().optional().allow(''),
  description: Joi.string().required(),
  reference_sites: Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.array().optional().allow(''),
  drive_link:Joi.string().optional().allow(''),
  animation:Joi.string().optional().allow(''),
  domain:Joi.string().optional().allow('')
});

const ValidateWebPremiumPlan = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({ tlds: { allow: true } })  // Enable basic email validation
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  company: Joi.string().optional().allow(''),
  description: Joi.string().required(),
  reference_sites: Joi.string().optional().allow(''),
  drive_link:Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.array().optional().allow(''),
  domain:Joi.string().optional().allow(''),
  animation:Joi.string().optional().allow(''),
  functionalities:(Joi.string()).optional().allow('') // Update to array
  
});

module.exports = {
  ValidateWebBasicPlan,
  ValidateWebStandardPlan,
  ValidateWebPremiumPlan
};
