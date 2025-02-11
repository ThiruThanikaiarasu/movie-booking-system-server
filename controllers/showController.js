const { getMovieById } = require("../services/movieService")
const { getScreenById } = require("../services/screenService")
const { createANewShow, findShow, getAllAvailableShowsFromToday, findShowsByKeyword } = require("../services/showService")
const { setResponseBody } = require("../utils/responseFormatter")

const addShow = async (request, response) => {
    const { screen, movie, showTime, price } = request.body

    try{
        const existingShow = await findShow(screen, movie, showTime)
        if (existingShow) {
            return response.status(409).send(setResponseBody("Show already exists", "conflict", null))
        }

        const screenDetails = await getScreenById(screen)
        if (!screenDetails) {
            return response.status(404).send(setResponseBody("Screen not found", "not_found", null))
        }

        const movieDetails = await getMovieById(movie)
        if (!movieDetails) {
            return response.status(404).send(setResponseBody("Movie not found", "not_found", null))
        }

        const newShow = await createANewShow(screen, movie, showTime, price, screenDetails.seatRow, screenDetails.seatsPerRow)

        response.status(201).send(setResponseBody("Show created successfully", null, newShow))

    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

const getAllAvailableShow = async (request, response) => {
    const { limit = 10, page = 1 } = request.query
    const limitInt = parseInt(limit, 10)
    const pageInt = parseInt(page, 10)

    try {
        const today = new Date()

        const shows = await getAllAvailableShowsFromToday(today, limitInt, pageInt)

        if (shows.length <= 0) {
            response.status(404).send(setResponseBody("No available shows found for today and after", 'not_found', null))
        } 

        response.status(200).send(setResponseBody("Shows retrieved successfully", 'success', shows))
    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

const searchAvailableShowsByKeyword = async (request, response) => {
    const { keyword, limit = 10, page = 1 } = request.query
    const limitInt = parseInt(limit, 10)
    const pageInt = parseInt(page, 10)

    try {
        if(!keyword || keyword.trim().length == 0 ) {
            return response.status(400).send(setResponseBody("Keyword is mandatory", "validation_error", null))
        }
        const shows = await findShowsByKeyword(keyword, limitInt, pageInt)

        response.status(200).send(setResponseBody("Movies retrieved successfully", "success", shows))
    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

module.exports = {
    addShow,
    getAllAvailableShow,
    searchAvailableShowsByKeyword
}