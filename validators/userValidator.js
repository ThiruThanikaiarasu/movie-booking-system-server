const Joi = require('joi')

const userSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must be no longer than 50 characters',
            'any.required': 'Name is a mandatory field'
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is a mandatory field'
        }),

    password: Joi.string()
        .min(8)
        .max(24)
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be less than 24 characters long',
            'any.required': 'Password is a mandatory field'
        }),

    role: Joi.string()
        .valid('user', 'admin')
        .default('user')
        .messages({
            'any.only': 'Role must be either "user" or "admin"'
        })
})

module.exports = { userSchema }
