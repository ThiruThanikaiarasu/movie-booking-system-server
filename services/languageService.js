const languageModel = require("../models/languageModel")

const findLanguage = (language) => {
    return languageModel.findOne({ language })
}

const createLanguage = async (language) => {
    const newLanguage = new languageModel({language})

    await newLanguage.save()

    return newLanguage
}

module.exports = {
    findLanguage,
    createLanguage
}