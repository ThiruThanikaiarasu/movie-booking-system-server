const { S3_BASE_URL } = require('../configurations/constants')
const S3TransactionError = require('../errors/S3TransactionError')
const genreModel = require('../models/genreModel')
const languageModel = require('../models/languageModel')
const movieModel = require('../models/movieModel')
const { uploadToS3 } = require('./s3Service')



const getMovieById = (id) => {
    return movieModel.findOne({ _id: id })
}

const checkMovieExistence = (title, genre, language) => {
    return movieModel.findOne({ title, genre, language})
}

const validateAllGenre = async (genre) => {
    const genresInCollection = await genreModel.find({ genre: { $in: genre } }).select('genre')

    return genre.length == genresInCollection.length
}

const validateLanguage = (language) => {
    return languageModel.findOne({language})
}

const createANewMovie = async (title, genre, duration, language, censorshipRating, releaseDate, cast, crew, thumbnail) => {
    try {
        const thumbnailS3Key = await uploadToS3(thumbnail)
    
        const newMovieData = {
            title, 
            genre, 
            duration, 
            language, 
            censorshipRating, 
            releaseDate, 
            cast: cast || [], 
            crew: crew || [], 
            thumbnail: {
                originalname: thumbnail.originalname,
                size: thumbnail.size,
                mimetype: thumbnail.mimetype,
                s3Key: S3_BASE_URL + thumbnailS3Key
            }
        } 

        const newMovie = new movieModel(newMovieData)

        await newMovie.save()

        return newMovie
    }
    catch(error) {
        if(error instanceof S3TransactionError) {
            throw error
        }

        throw error
    }
}

const searchMoviesByKeyword = async (keyword, limit, page) => {
    const skip = (page - 1) * limit 

    const movies = await movieModel.aggregate(
        [
            {
                $match: {
                    $or: [
                        { title: { $regex: keyword, $options: 'i' } },
                        { genre: { $regex: keyword, $options: 'i' } }
                    ]
                }
            },
            {
                $facet: {
                    metadata: [
                        { $count: 'total' }  
                    ],
                    movies: [
                        { $skip: skip },  
                        { $limit: limit } 
                    ]
                }
            },
            {
                $project: {
                    total: { $arrayElemAt: ['$metadata.total', 0] },
                    movies: '$movies'
                }
            }
        ]
    )

    return movies
}

module.exports = {
    getMovieById,
    checkMovieExistence,
    validateAllGenre,
    validateLanguage,
    createANewMovie,
    searchMoviesByKeyword
}