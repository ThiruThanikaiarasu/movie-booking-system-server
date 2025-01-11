const Joi = require('joi')

const theaterSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must not exceed 100 characters',
            'any.required': 'Name is a mandatory field'
        }),

    location: Joi.object({
        street1: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.empty': 'Street1 is required',
                'string.min': 'Street1 must be at least 3 characters long',
                'string.max': 'Street1 must not exceed 100 characters',
                'any.required': 'Street1 is a mandatory field'
            }),

        street2: Joi.string()
            .trim()
            .max(100)
            .messages({
                'string.max': 'Street2 must not exceed 100 characters'
            }),

        city: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.empty': 'City is required',
                'string.min': 'City must be at least 3 characters long',
                'string.max': 'City must not exceed 100 characters',
                'any.required': 'City is a mandatory field'
            }),

        district: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.empty': 'District is required',
                'string.min': 'District must be at least 3 characters long',
                'string.max': 'District must not exceed 100 characters',
                'any.required': 'District is a mandatory field'
            }),

        state: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.empty': 'State is required',
                'string.min': 'State must be at least 3 characters long',
                'string.max': 'State must not exceed 100 characters',
                'any.required': 'State is a mandatory field'
            }),

        country: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.empty': 'Country is required',
                'string.min': 'Country must be at least 3 characters long',
                'string.max': 'Country must not exceed 100 characters',
                'any.required': 'Country is a mandatory field'
            }),

        zip: Joi.string()
            .trim()
            .min(5)
            .max(10)
            .required()
            .messages({
                'string.empty': 'Zip code is required',
                'string.min': 'Zip code must be at least 5 characters long',
                'string.max': 'Zip code must not exceed 10 characters',
                'any.required': 'Zip code is a mandatory field'
            }),

        landmark: Joi.string()
            .trim()
            .max(200)
            .messages({
                'string.max': 'Landmark must not exceed 200 characters'
            })
    })
    .required()
    .messages({
        'object.base': 'Location is required',
        'any.required': 'Location is a mandatory field'
    })
})

module.exports = { theaterSchema }
