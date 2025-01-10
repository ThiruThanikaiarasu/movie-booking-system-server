const { findGenre, createGenre } = require('../services/genreService')
const { setResponseBody } = require('../utils/responseFormatter')

const addGenre = async (request, response) => {
    const { genre } = request.body

    try {
        const existingGenre = await findGenre(genre)
        if (existingGenre) {
            return response.status(409).send(setResponseBody('Genre already exists', 'conflict', null))
        }

        const newGenre = await createGenre(genre)

        response.status(201).send(setResponseBody('Genre added successfully', null, newGenre))
    } catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

module.exports = {
    addGenre
}
