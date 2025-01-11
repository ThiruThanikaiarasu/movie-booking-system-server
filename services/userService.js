const bcrypt = require('bcryptjs')

const userModel = require("../models/userModel")
const bookingModel = require('../models/bookingModel')

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

const getAllBookingByUser = async (user) => {
    try {
        const bookings = await bookingModel.aggregate([
            {
                $match: {
                    user: user._id
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
                    from: 'theaters', 
                    localField: 'screenDetails.theater',
                    foreignField: '_id',
                    as: 'theaterDetails'
                }
            },
            {
                $unwind: '$theaterDetails'
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
                    'showDetails.showTime': 1, 
                    'showDetails.price': 1, 
                    'screenDetails.name': 1, 
                    'theaterDetails.name': 1, 
                    'theaterDetails.location': 1, 
                    'movieDetails.title': 1, 
                    'movieDetails.genre': 1 
                }
            }
        ])
        
        return bookings
    } catch (error) {
        throw new Error('Error fetching bookings by user: ' + error.message)
    }
}

module.exports = {
    findUserById,
    findUserByEmail,
    findUserByEmailWithPassword,
    createUser,
    validatePassword,
    getAllBookingByUser
}