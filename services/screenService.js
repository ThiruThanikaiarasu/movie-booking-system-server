const screenModel = require("../models/screenModel")

const findScreen = (theater, name) => {
    return screenModel.findOne({ theater, name })
}

const createANewScreen = async (theater, name, seatRow, seatsPerRow) => {
    const newScreen = new screenModel({
        theater,
        name, 
        seatRow,
        seatsPerRow
    })

    await newScreen.save()

    return newScreen
}

module.exports = {
    findScreen,
    createANewScreen
}