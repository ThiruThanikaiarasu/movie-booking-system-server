const { findLanguage, createLanguage } = require("../services/languageService")
const { setResponseBody } = require("../utils/responseFormatter")

const addLanguage = async (request, response) => {
    const { language } = request.body
    try{
        const existingLanguage = await findLanguage(language)
        if (existingLanguage) {
            return response.status(409).send(setResponseBody('Language already exists', 'conflict', null))
        }

        const newLanguage = await createLanguage(language)
        
        response.status(201).send(setResponseBody('Language added successfully', null, newLanguage))
    }
    catch (error) {
        response.status(500).send(setResponseBody(error.message, 'server_error', null))
    }
}

module.exports = {
    addLanguage
}