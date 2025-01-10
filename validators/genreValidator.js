const Joi = require('joi')

const genreSchema = Joi.object({
    genre: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Genre is required',
            'string.min': 'Genre must be at least 2 characters long',
            'string.max': 'Genre must not exceed 50 characters',
            'any.required': 'Genre is a mandatory field'
        }),
})

module.exports = { genreSchema }
