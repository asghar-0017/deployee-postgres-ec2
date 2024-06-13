const Joi = require('joi');

const ValidateDigitalMarketing = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    company: Joi.string().optional(),
    links_to_soial_media: Joi.string().optional(),
    target_audiance:Joi.string().optional(),
    access_and_permissions:Joi.string().required(),
    description:Joi.string().optional()

  
});

module.exports = { ValidateDigitalMarketing };
