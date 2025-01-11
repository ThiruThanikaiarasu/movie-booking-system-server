const { findScreen, createANewScreen } = require("../services/screenService")
const { setResponseBody } = require("../utils/responseFormatter")

const addScreen = async (request, response) => {
    const { theater, name, seatRow, seatsPerRow } = request.body

    try{
        const existingScreen = await findScreen(theater, name)
        if(existingScreen) {
            return response.status(409).send(setResponseBody("Screen already exist", "conflict", null))
        }

        const screen = await createANewScreen(theater, name, seatRow, seatsPerRow)

        response.status(201).send(setResponseBody("Screen created successfully", null, screen))
    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

module.exports = {
    addScreen
}