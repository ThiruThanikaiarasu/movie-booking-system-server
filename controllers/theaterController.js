const { createANewTheater, findTheater } = require("../services/theaterService")
const { setResponseBody } = require("../utils/responseFormatter")

const addTheater = async (request, response) => {
    const { name, location } = request.body
    const user = request.user

    try {
        const existingTheater = await findTheater(name, user, location)
        if(existingTheater) {
            return response.status(409).send(setResponseBody("Theatre already exist", "conflict", null))
        }

        const theater = await createANewTheater(name, user, location)

        response.status(201).send(setResponseBody("Theater created successfully", null, theater))
    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

module.exports = {
    addTheater
}