const Joi = require('joi');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

const phoneExtension = (joi) => ({
  type: 'phone',
  base: joi.string(),
  messages: {
    'phone.invalid': '{{#label}} must be a valid phone number'
  },
  validate(value, helpers) {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return { value, errors: helpers.error('phone.invalid') };
    }
    const formattedNumber = phoneNumber.formatInternational().replace(/(\+\d{1,3})\s(\d)/, '$1 $2').replace(/\s/g, '-').replace(/--/g, '-');
    return { value: formattedNumber };
  }
});

const customJoi = Joi.extend(phoneExtension);

const ValidateContact = customJoi.object({
  name: customJoi.string().required(), // Allow empty string for name
  email: Joi.string()
    .email({ tlds: { allow: true } })  // Enable basic email validation
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  company: customJoi.string().allow('').optional(),
  phone: customJoi.phone().required(),
  message: customJoi.string().required(),
  serviceType: customJoi.string().required()
});

module.exports = {
  ValidateContact
};
