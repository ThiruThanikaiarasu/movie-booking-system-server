const S3TransactionError = require("../errors/S3TransactionError")
const { validateAllGenre, validateLanguage, checkMovieExistence, createANewMovie, searchMoviesByKeyword } = require("../services/movieService")
const { setResponseBody } = require("../utils/responseFormatter")
const { searchMoviesQueryValidator } = require("../validators/searchMoviesQueryValidator")

const createMovie = async (request, response) => {
    const { title, genre, duration, language, censorshipRating, releaseDate } = request.body
    const { crew, cast } = request.body || []
    const thumbnail = request.file

    try {
        const existingMovie = await checkMovieExistence(title, genre, language)
        if(existingMovie) {
            return response.status(409).send(setResponseBody("Movie already exist.", "conflict", null))
        }

        const validGenre = await validateAllGenre(genre)
        if(!validGenre) {
            return response.status(400).send(setResponseBody("Genre is invalid.", "validation_error", null))
        }

        const validLanguage = await validateLanguage(language)
        if(!validLanguage) {
            return response.status(400).send(setResponseBody("Language is invalid.", "validation_error", null))
        }

        const movie = await createANewMovie(title, genre, duration, language, censorshipRating, releaseDate, cast, crew, thumbnail)        

        response.status(201).send(setResponseBody("Movie added successfully", null, movie))
    }
    catch (error) {
        if(error instanceof S3TransactionError) {
            return response.status(error.statusCode).send(setResponseBody(error.message, "service_unavailable", null))
        }

        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

const searchMovies = async (request, response) => {
    const { keyword, limit = 10, page = 1 } = request.query

    await searchMoviesQueryValidator.validateAsync({ limit, page, keyword })

    const limitInt = parseInt(limit, 10)
    const pageInt = parseInt(page, 10)

    try{
        const movies = await searchMoviesByKeyword(keyword, limitInt, pageInt)

        return response.status(200).send(setResponseBody("Searched movie result.", null, movies))
    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

module.exports = {
    createMovie,
    searchMovies
}