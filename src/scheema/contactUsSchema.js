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
  website: Joi.string().allow('').optional(),
  phone: Joi.number().required(),
  message: Joi.string().required(),
  serviceType: Joi.string().required()
});

module.exports = {
  ValidateContact
};
