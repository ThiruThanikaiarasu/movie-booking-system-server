const bcrypt = require('bcryptjs')

const userModel = require("../models/userModel")

const findUserByEmail = (email) => {
    return userModel.findOne({ email })
}

const findUserByEmailWithPassword = (email) => {
    return userModel.findOne({ email }).select('+password')
}

const createUser = async (userData) => {
    const newUser = new userModel(userData)

    return await newUser.save()
}

const validatePassword = (userEnteredPassword, actualPassword) => {
    return bcrypt.compare(userEnteredPassword, actualPassword)
}

module.exports = {
    findUserByEmail,
    findUserByEmailWithPassword,
    createUser,
    validatePassword
}