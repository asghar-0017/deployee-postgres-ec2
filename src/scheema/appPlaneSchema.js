const Joi = require('joi');

const ValidateAppBasicPlan = Joi.object({
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
  reference_App:Joi.string().optional().allow(''),
  drive_links_to_icons:Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.string().optional().allow(''),
});

const ValidateAppStandardPlan = Joi.object({
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
  description: Joi.string().required(),
  reference_App:Joi.string().optional().allow(''),
  drive_links_to_icons:Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.string().optional().allow(''),
  animation_Reference:Joi.string().optional().allow(''),


});

const ValidateAppPremiumPlan = Joi.object({
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
  description: Joi.string().required(),
  reference_App:Joi.string().optional().allow(''),
  drive_links_to_icons:Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.string().optional().allow(''),
  animation_Reference:Joi.string().optional().allow(''),
  functionalities:Joi.string().optional().allow(''),

});








module.exports = {
  ValidateAppBasicPlan,
  ValidateAppStandardPlan,
  ValidateAppPremiumPlan,
};
