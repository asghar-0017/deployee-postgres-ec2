const Joi = require('joi');

const ValidateContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  company: Joi.string().required(),
  message: Joi.string().required(),
  serviceType: Joi.string().required(), // Update this line
});

module.exports = { ValidateContact };
