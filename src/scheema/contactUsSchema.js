const Joi = require('joi');

const ValidateContact = Joi.object({
  name: Joi.string().required(), // Allow empty string for name
  email: Joi.string()
    .email({ tlds: { allow: true } })  // Enable basic email validation
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  company: Joi.string().allow('').optional(),
  website: Joi.string()
    .pattern(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/?$/) // Regex for validating a website URL
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Please provide a valid website URL'
    }),
  phone: Joi.number().required(),
  message: Joi.string().required(),
  serviceType: Joi.string().required()
})

module.exports = {
  ValidateContact
};
