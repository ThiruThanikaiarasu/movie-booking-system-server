const Joi = require('joi')

const movieValidator = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.base': 'Title should be a type of string',
            'string.empty': 'Title is a mandatory field',
            'string.min': 'Title must be at least 1 character long',
            'string.max': 'Title must not exceed 100 characters',
            'any.required': 'Title is a mandatory field'
        }),

        genre: Joi.array()
        .items(Joi.string().required())
        .required()
        .messages({
            'array.base': 'Genre should be a type of array',
            'array.includes': 'Each genre item should be a type of string',
            'any.required': 'Genre is a mandatory field'
        }),    

    duration: Joi.number()
        .min(1)
        .max(300)
        .required()
        .messages({
            'number.base': 'Duration should be a type of number',
            'number.min': 'Duration must be at least 1 minute',
            'number.max': 'Duration must not exceed 300 minutes',
            'any.required': 'Duration is a mandatory field'
        }),

    language: Joi.string()
        .required()
        .messages({
            'string.base': 'Language should be a type of string',
            'any.required': 'Language is a mandatory field'
        }),

    thumbnail: Joi.object({
        file: Joi.object({
            mimetype: Joi.string()
                .regex(/^image\/(jpeg|png|gif|webp|svg\+xml)$/)
                .required()
                .messages({
                    'string.base': 'Thumbnail mimetype should be a type of string',
                    'string.pattern.base': 'Invalid MIME type. Allowed types are: jpeg, png, gif, webp, svg+xml',
                    'any.required': 'Thumbnail mimetype is a mandatory field'
                }),
            size: Joi.number()
                .required()
                .messages({
                    'number.base': 'Thumbnail size should be a type of number',
                    'any.required': 'Thumbnail size is a mandatory field'
                })
        }).required()
    }),

    censorshipRating: Joi.string()
        .valid('U', 'U/A', 'A', 'U/A 7+', 'U/A 13+', 'S')
        .required()
        .messages({
            'string.base': 'Censorship rating should be a type of string',
            'any.required': 'Censorship rating is a mandatory field',
            'any.only': 'Invalid censorship rating. Allowed ratings are: U, U/A, A, U/A 7+, U/A 13+, S'
        }),

    releaseDate: Joi.date().required().messages({
        'date.base': 'Release date should be a type of date',
        'any.required': 'Release date is a mandatory field'
    }),

    cast: Joi.array()
        .items(
            Joi.object({
                role: Joi.string()
                    .valid('actor', 'actress', 'comedian')
                    .required()
                    .messages({
                        'string.base': 'Role should be a type of string',
                        'any.required': 'Role is a mandatory field for cast',
                        'any.only': 'Role must be either actor, actress, or comedian'
                    }),
                name: Joi.string()
                    .min(2)
                    .max(50)
                    .required()
                    .trim()
                    .messages({
                        'string.base': 'Cast member name should be a type of string',
                        'string.empty': 'Cast member name is a mandatory field',
                        'string.min': 'Cast member name must be at least 2 characters long',
                        'string.max': 'Cast member name must not exceed 50 characters',
                        'any.required': 'Cast member name is a mandatory field'
                    })
            })
        )
        .required(),

    crew: Joi.array()
        .items(
            Joi.object({
                role: Joi.string()
                    .valid('director', 'producer', 'writer', 'editor', 'cinematographer')
                    .required()
                    .messages({
                        'string.base': 'Role should be a type of string',
                        'any.required': 'Role is a mandatory field for crew',
                        'any.only': 'Role must be one of director, producer, writer, editor, cinematographer'
                    }),
                name: Joi.string()
                    .min(2)
                    .max(50)
                    .required()
                    .trim()
                    .messages({
                        'string.base': 'Crew member name should be a type of string',
                        'string.empty': 'Crew member name is a mandatory field',
                        'string.min': 'Crew member name must be at least 2 characters long',
                        'string.max': 'Crew member name must not exceed 50 characters',
                        'any.required': 'Crew member name is a mandatory field'
                    })
            })
        )
        .required()
})

module.exports = {
    movieValidator
}
