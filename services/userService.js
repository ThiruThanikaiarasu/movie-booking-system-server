const userModel = require("../models/userModel")

const findUserByEmail = (email) => {
    return userModel.findOne({ email })
}

const createUser = async (userData) => {
    const newUser = new userModel(userData)

    return await newUser.save()
}

module.exports = {
    findUserByEmail,
    createUser
}