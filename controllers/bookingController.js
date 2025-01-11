const { isSeatsAvailable, createBooking } = require("../services/bookingService")
const { findShowById } = require("../services/showService")
const { setResponseBody } = require("../utils/responseFormatter")

const bookTickets = async (request, response) => {
    const { show, seats } = request.body
    const user = request.user

    try{
        const showDetails = await findShowById(show)
        if(!showDetails) {
            return response.status(404).send(setResponseBody("Show not found", "not_found", null))
        }

        const availableSeat = await isSeatsAvailable(showDetails.seatMap, seats)
        if(!availableSeat) {
            return response.status(409).send(setResponseBody("Seats are not available", 'conflict', showDetails.seatMap))
        }

        const booking = await createBooking(user, showDetails, seats)

        response.status(201).send(setResponseBody("Booking created successfully", null, booking))

    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

module.exports = {
    bookTickets
}