const Joi = require('joi');

const ValidateAppBasicPlanes = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().optional(),
  reference_App: Joi.string().optional(),
  drive_links_to_icons:Joi.string().optional(),
  description:Joi.string().required(),
  Link_to_Graphics:Joi.array().optional(),
});

const ValidateAppStandardPlanes = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    company: Joi.string().optional(),
    reference_App: Joi.string().optional(),
    drive_links_to_icons:Joi.string().optional(),
    animation_Reference:Joi.string().optional(),
    description:Joi.string().required(),
    Link_to_Graphics:Joi.array().optional(),
});

const ValidateAppPremiumPlanes = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    company: Joi.string().optional(),
    reference_App: Joi.string().optional(),
    drive_links_to_icons:Joi.string().optional(),
    animation_Reference:Joi.string().optional(),
    description:Joi.string().required(),
    functionalities: Joi.array().items(Joi.string()).optional(),
    Link_to_Graphics:Joi.array().optional()

  
});

module.exports = {
  ValidateAppBasicPlanes,
  ValidateAppStandardPlanes,
  ValidateAppPremiumPlanes
};
