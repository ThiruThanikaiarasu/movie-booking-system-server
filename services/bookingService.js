const bookingModel = require("../models/bookingModel")

const isSeatsAvailable = (seatMap, requestedSeats) => {

    for (let seat of requestedSeats) {
        
        const row = seat.charAt(0)
        const seatNumber = parseInt(seat.substring(1)) - 1 

        if (!seatMap.has(row)) {
            return false
        }

        const rowSeats = seatMap.get(row)
        if (rowSeats[seatNumber] === '1') {
            return false 
        }
    }

    return true
}

const createBooking = async (user, showDetails, seats) => {
    try {
        const pricePerSeat = showDetails.price
        const totalPrice = pricePerSeat * seats.length

        const seatMap = Object.fromEntries(showDetails.seatMap)

        seats.forEach(seat => {
            if (typeof seat !== 'string' || seat.length < 2) {
                throw new Error(`Invalid seat format: ${seat}`)
            }

            const row = seat.charAt(0)
            const seatNum = parseInt(seat.substring(1)) - 1

            if (!seatMap[row]) {
                throw new Error(`Invalid row: ${row}`)
            }

            if (seatNum < 0 || seatNum >= seatMap[row].length) {
                throw new Error(`Invalid seat number: ${seatNum + 1} in row ${row}`)
            }

            if (seatMap[row][seatNum] === '1') {
                throw new Error(`Seat ${seat} is already booked`)
            }

            seatMap[row] = seatMap[row].substring(0, seatNum) + '1' + seatMap[row].substring(seatNum + 1)
        })

        showDetails.seatMap = new Map(Object.entries(seatMap))
        await showDetails.save()

        const booking = new bookingModel({
            user: user._id,
            show: showDetails._id,
            seats,
            totalPrice
        })

        await booking.save()

        return booking
    } catch (error) {
        throw error
    }
}

module.exports = {
    isSeatsAvailable,
    createBooking
}