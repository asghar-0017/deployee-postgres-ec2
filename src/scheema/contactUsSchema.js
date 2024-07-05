const Joi = require('joi');
// const { parsePhoneNumberFromString } = require('libphonenumber-js');

// const phoneExtension = (joi) => ({
//   type: 'phone',
//   base: joi.string(),
//   messages: {
//     'phone.invalid': '{{#label}} must be a valid phone number'
//   },
//   validate(value, helpers) {
//     const phoneNumber = parsePhoneNumberFromString(value);
//     if (!phoneNumber || !phoneNumber.isValid()) {
//       return { value, errors: helpers.error('phone.invalid') };
//     }
//     const formattedNumber = phoneNumber.formatInternational().replace(/(\+\d{1,3})\s(\d)/, '$1 $2').replace(/\s/g, '-').replace(/--/g, '-');
//     return { value: formattedNumber };
//   }
// });

// const customJoi = Joi.extend(phoneExtension);

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
  phone: Joi.number().required(),
  message: Joi.string().required(),
  serviceType: Joi.string().required()
});

module.exports = {
  ValidateContact
};
