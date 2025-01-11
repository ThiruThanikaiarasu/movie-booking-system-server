const { SEAT_ROWS } = require("../configurations/constants")
const showModel = require("../models/showModel")


const findShow = (screen, movie, showTime) => {
    return showModel.findOne({ screen, movie, showTime })
}

const createANewShow = async (screen, movie, showTime, price, seatRow, seatsPerRow) => {
    

    const rows = SEAT_ROWS.slice(0, seatRow)

    let seatMap = {}

    let availableSeats = '0'.repeat(seatsPerRow)
    rows.forEach(row => {
        seatMap[row] = availableSeats
    })

    const newShow = new showModel({
        screen: screen,
        movie: movie,
        showTime: showTime,
        price: price,
        seatMap: seatMap, 
    })

    await newShow.save()

    return newShow
}

module.exports = {
    findShow,
    createANewShow
}