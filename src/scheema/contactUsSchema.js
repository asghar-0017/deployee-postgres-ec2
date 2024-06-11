const Joi = require('joi');

const ValidateContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    company: Joi.string().optional(),
    message: Joi.string().optional(),
    serviceType: Joi.string().valid(
        'Web Development', 
        'App Development', 
        'Digital Marketing', 
        'Search Engine Optimization', 
        'Mobile App Development'
    ).required()
});

module.exports = { ValidateContact };
