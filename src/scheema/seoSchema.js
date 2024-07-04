const Joi = require('joi');

const ValidateSEO = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
    .email({ tlds: { allow: true } })  // Enable basic email validation
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    company: Joi.string().optional().allow(''),
    Website_of_the_client: Joi.string().optional().allow(''),
    Platform_of_the_website: Joi.string().optional().allow(''),
    competitor_website_reference: Joi.string().optional().allow(''),
    current_SEO_Efforts: Joi.string().optional().allow(''),
    access_and_permissions: Joi.string().required(),
    description: Joi.string().required()
});

module.exports = { ValidateSEO };
