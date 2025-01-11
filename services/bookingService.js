const { default: mongoose } = require("mongoose")
const bookingModel = require("../models/bookingModel")
const { findShowById } = require("./showService")

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

const findBookingById = async (bookingId) => {
    const booking = await bookingModel.aggregate([
        {
            $match: {
            _id: new mongoose.Types.ObjectId(bookingId),
            }
        },
        {
            $lookup: {
            from: 'shows', 
            localField: 'show',  
            foreignField: '_id', 
            as: 'showDetails' 
            }
        },
        {
            $unwind: '$showDetails' 
        },
        {
            $lookup: {
            from: 'screens', 
            localField: 'showDetails.screen', 
            foreignField: '_id', 
            as: 'screenDetails'
            }
        },
        {
            $unwind: '$screenDetails'
        },
        {
            $lookup: {
            from: 'movies', 
            localField: 'showDetails.movie', 
            foreignField: '_id', 
            as: 'movieDetails'
            }
        },
        {
            $unwind: '$movieDetails'
        },
        {
            $project: {
            _id: 1,
            seats: 1,
            totalPrice: 1,
            showDetails: 1,
            screenDetails: 1,
            movieDetails: 1,
            }
        }
    ])
    return booking
}

const cancelBookingById = async (booking, show) => {
    try {
        const showDetails = await findShowById(show._id)
        
        const seatMap = Object.fromEntries(showDetails.seatMap)

        booking.seats.forEach(seat => {
            const row = seat.charAt(0)
            const seatNum = parseInt(seat.substring(1)) - 1

            if (!seatMap[row]) {
                throw new Error(`Invalid row: ${row}`)
            }

            if (seatNum < 0 || seatNum >= seatMap[row].length) {
                throw new Error(`Invalid seat number: ${seatNum + 1} in row ${row}`)
            }

            if (seatMap[row][seatNum] === '0') {
                throw new Error(`Seat ${seat} was not booked`)
            }

            seatMap[row] = seatMap[row].substring(0, seatNum) + '0' + seatMap[row].substring(seatNum + 1)
        })

        showDetails.seatMap = new Map(Object.entries(seatMap))
        await showDetails.save()

        await bookingModel.findByIdAndDelete(booking._id)
    } 
    catch (error) {
        throw new Error('Error while canceling booking: ' + error.message)
    }
}

module.exports = {
    isSeatsAvailable,
    createBooking,
    findBookingById,
    cancelBookingById
}