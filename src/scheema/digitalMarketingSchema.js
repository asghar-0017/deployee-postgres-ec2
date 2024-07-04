const Joi = require('joi');

const ValidateDigitalMarketing = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
    .email({ tlds: { allow: true } })  // Enable basic email validation
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    company: Joi.string().optional().allow(''),
    links_to_social_media: Joi.string().optional().allow(''),
    target_audience:Joi.string().optional().allow(''),
    access_and_permissions:Joi.string().required(),
    description:Joi.string().optional().allow('')

  
});

module.exports = { ValidateDigitalMarketing };
