const Joi = require('joi')

const searchMoviesQueryValidator = Joi.object({
    keyword: Joi.string()
        .min(1)
        .required()
        .messages({
            'string.base': 'Keyword should be a type of string',
            'string.empty': 'Keyword cannot be empty',
            'string.min': 'Keyword must be at least 1 character long',
            'any.required': 'Keyword is a mandatory field',
        }),

    limit: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
        'number.base': 'Limit should be a type of number',
        'number.min': 'Limit must be at least 1',
        'any.optional': 'Limit is optional'
    }),

    page: Joi.number()
        .integer()
        .min(1)
        .optional()
        .messages({
            'number.base': 'Page should be a type of number',
            'number.min': 'Page must be at least 1',
            'any.optional': 'Page is optional'
        })
})

module.exports = { searchMoviesQueryValidator }