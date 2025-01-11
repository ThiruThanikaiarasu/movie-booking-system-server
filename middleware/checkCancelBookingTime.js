const { setResponseBody } = require("../utils/responseFormatter")
const { findBookingById } = require("../services/bookingService")


const isCancellationWithinTimeLimit = async (request, response, next) => {
    try {
        const { bookingId } = request.params
    
        const booking = await findBookingById(bookingId)
        if (!booking || booking.length == 0) {
            return response.status(404).send(setResponseBody('Booking not found', "not_found", null))
        }
        
        const showDetails = booking[0].showDetails
        const showTime = new Date(showDetails.showTime) 
        const currentTime = new Date()
    
        const timeDifference = (showTime - currentTime) / (1000 * 60 * 60)
        if (timeDifference < 2) {
            return response.status(400).send(setResponseBody('Booking cancellation is not possible within 2 hours of the showtime', "time_exceed", null))
        }

        request.booking = booking[0]
        request.showDetails = showDetails
    
        next()
    } catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
  }
  
  module.exports = {
    isCancellationWithinTimeLimit
  }
  