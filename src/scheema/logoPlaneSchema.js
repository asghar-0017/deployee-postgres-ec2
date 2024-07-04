const Joi = require('joi');

const ValidateLogoBasicPlan = Joi.object({
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
  reference_logos:Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.array().optional().allow(''),


});

const ValidateLogoStandardPlan = Joi.object({
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
  reference_logos:Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.array().optional().allow(''),

});

const ValidateLogoPremiumPlan = Joi.object({
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
  reference_template:Joi.string().optional().allow(''),
  reference_logos:Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.array().optional().allow(''),
});


const ValidateLogoBusinessPlan = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({ tlds: { allow: true } })  // Enable basic email validation
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  description: Joi.string().required(),
  company: Joi.string().optional().allow(''),
  product_design: Joi.string().valid('Gadgets', 'Clothing', 'Other').required(), // Ensure it's required
  reference_websites:Joi.string().optional().allow(''),
  reference_template:Joi.string().optional().allow(''),
  reference_logos:Joi.string().optional().allow(''),
  Link_to_Graphics:Joi.array().optional().allow(''),
  drive_link_to_reference_images:Joi.string().optional().allow('')

});





module.exports = {
  ValidateLogoBasicPlan,
  ValidateLogoStandardPlan,
  ValidateLogoPremiumPlan,
  ValidateLogoBusinessPlan,
};
