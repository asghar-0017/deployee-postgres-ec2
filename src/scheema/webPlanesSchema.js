const Joi = require('joi');

const ValidateWebBasicPlains = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().optional(),
  reference_sites: Joi.string().optional(),
  Link_to_Graphics:Joi.array().optional(),
  description:Joi.string().required()
});

const ValidateWebStandardPlains = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().optional(),
  description: Joi.string().required(),
  reference_sites: Joi.string().optional(),
  Link_to_Graphics:Joi.array().optional(),
  drive_link:Joi.string().optional(),
  animation:Joi.string().optional(),
  domain:Joi.string().optional()
});

const ValidateWebPremiumPlains = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  company: Joi.string().optional(),
  description: Joi.string().required(),
  reference_sites: Joi.string().optional(),
  drive_link:Joi.string().optional(),
  Link_to_Graphics:Joi.array().optional(),
  domain:Joi.string().optional(),
  animation:Joi.string().optional(),
  functionalities: Joi.array().items(Joi.string()).optional() // Update to array
  
});

module.exports = {
  ValidateWebBasicPlains,
  ValidateWebStandardPlains,
  ValidateWebPremiumPlains
};