const theaterModel = require("../models/theaterModel")

const findTheater = (name, owner, location) => {
    return theaterModel.findOne({ name, owner: owner._id, location })
}

const createANewTheater = async (name, owner, location) => {
    const newTheater = new theaterModel(
        {
            name,
            owner: owner._id,
            location
        }
    )

    await newTheater.save()

    return newTheater
}

module.exports = {
    findTheater,
    createANewTheater
}