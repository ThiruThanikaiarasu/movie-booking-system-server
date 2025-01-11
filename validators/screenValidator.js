const Joi = require('joi')

const screenSchema = Joi.object({
    theater: Joi.string()
        .required()
        .messages({
            'string.empty': 'Theater ID is required',
            'any.required': 'Theater is a mandatory field',
        }),
  
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Screen name is required',
            'string.min': 'Screen name must be at least 2 characters long',
            'string.max': 'Screen name must not exceed 50 characters',
            'any.required': 'Screen name is a mandatory field',
        }),

    seatRow: Joi.number()
        .min(1)
        .max(100)
        .required()
        .messages({
            'number.base': 'Seat row must be a number',
            'number.min': 'At least 1 seat row is required',
            'number.max': 'No more than 100 seat rows are allowed',
            'any.required': 'Seat row is a mandatory field',
        }),

    seatsPerRow: Joi.number()
        .min(1)
        .max(100)
        .required()
        .messages({
            'number.base': 'Seats per row must be a number',
            'number.min': 'At least 1 seat per row is required',
            'number.max': 'No more than 100 seats per row are allowed',
            'any.required': 'Seats per row is a mandatory field',
        })
})

module.exports = { screenSchema }
