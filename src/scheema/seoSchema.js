const Joi = require('joi');

const ValidateSEO = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    company: Joi.string().optional(),
    Website_of_the_client: Joi.string().optional(),
    Platform_of_the_website: Joi.string().optional(),
    competitor_website_reference: Joi.string().optional(),
    current_SEO_Efforts: Joi.string().optional(),
    access_and_permissions: Joi.string().required(),
    description: Joi.string().optional()
});

module.exports = { ValidateSEO };
