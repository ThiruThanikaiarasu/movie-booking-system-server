const Joi = require('joi')

const languageSchema = Joi.object({
    language: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Language name is required',
            'string.min': 'Language name must be at least 2 characters long',
            'string.max': 'Language name must not exceed 50 characters',
            'any.required': 'Language name is a mandatory field',
        }),
})

module.exports = { languageSchema }
