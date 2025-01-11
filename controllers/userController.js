const { getAllBookingByUser } = require("../services/userService")
const { setResponseBody } = require("../utils/responseFormatter")

const getAllBookings = async (request, response) => {
    const user = request.user
    try {
        const bookings = await getAllBookingByUser(user)

        if (!bookings || bookings.length === 0) {
            return response.status(404).send(setResponseBody("No bookings found", "not_found", null))
        }

        response.status(200).send(setResponseBody("Bookings retrieved successfully", null, bookings))
    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

module.exports = {
    getAllBookings
}