const Joi = require('joi')

const showSchema = Joi.object({
    screen: Joi.string().required().messages({
        'string.base': 'Screen must be a string',
        'any.required': 'Screen is required',
    }),
    movie: Joi.string().required().messages({
        'string.base': 'Movie must be a string',
        'any.required': 'Movie is required',
    }),
    showTime: Joi.date().iso().required().messages({
        'date.base': 'Show time must be a valid date',
        'any.required': 'Show time is required',
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required',
    }),
})

module.exports = {
    showSchema
}

