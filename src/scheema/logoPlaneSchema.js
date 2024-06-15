const Joi = require('joi');

const ValidateLogoBasicPlane = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().optional(),
  description: Joi.string().required(),
  Link_to_Graphics: Joi.array().optional(),
  reference_logos: Joi.string().optional(),
});

const ValidateLogoStandardPlane = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().optional(),
  description: Joi.string().required(),
  reference_logos: Joi.string().optional(),
  Link_to_Graphics: Joi.array().optional(),
});

const ValidateLogoPremiumPlane = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().optional(),
  reference_logos: Joi.string().optional(),
  reference_template: Joi.string().optional(),
  description: Joi.string().required(),
  Link_to_Graphics: Joi.array().optional(),
});


const ValidateLogoBusinessPlane = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().optional(),
  reference_logos: Joi.string().optional(),
  reference_template: Joi.string().optional(),
  reference_websites: Joi.string().optional(),
  custom_product_design: Joi.string().optional().allow(''),
  product_design: Joi.string().valid('Gadgets', 'Clothing', 'Other').required(), // Ensure it's required
  drive_link_to_reference_images: Joi.string().optional(),
  Link_to_Graphics: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().required(),
});





module.exports = {
  ValidateLogoBasicPlane,
  ValidateLogoStandardPlane,
  ValidateLogoPremiumPlane,
  ValidateLogoBusinessPlane,
};
