const Joi = require('joi')

const bookingSchema = Joi.object({

    show: Joi.string()
        .required()
        .messages({
            'any.required': 'Show ID is required',
            'string.base': 'Show ID must be a string'
        }),

    seats: Joi.array()
        .items(Joi.string().regex(/^[A-Za-z]+\d+$/))
        .min(1)
        .required()
        .messages({
            'array.min': 'At least one seat must be selected',
            'any.required': 'Seats are required',
            'string.pattern.base': 'Seats must follow the correct format (e.g., "A1", "B2")'
        }),
})

module.exports = {
    bookingSchema
}