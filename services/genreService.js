const genreModel = require('../models/genreModel')

const findGenre = (genre) => {
    return genreModel.findOne({ genre })
}

const createGenre = async (genre) => {
    const newGenre = new genreModel({ genre })

    await newGenre.save()

    return newGenre
}

module.exports = {
    findGenre,
    createGenre
}
