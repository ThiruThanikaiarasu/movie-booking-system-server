const bcrypt = require('bcryptjs')

const userModel = require("../models/userModel")

const findUserById = (id) => {
    return userModel.findOne({ _id: id })
}

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
    findUserById,
    findUserByEmail,
    findUserByEmailWithPassword,
    createUser,
    validatePassword
}