const { SEAT_ROWS } = require("../configurations/constants")
const showModel = require("../models/showModel")


const findShowById = (id) => {
    return showModel.findOne({ _id: id })
}

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

const getAllAvailableShowsFromToday = async (date, limit, page) => {
    const skip = (page - 1) * limit
    const shows = await showModel.aggregate([
        {
            $match: {
                showTime: { $gte: date }
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: 'movie',
                foreignField: '_id',
                as: 'movieDetails'
            }
        },
        {
            $unwind: '$movieDetails'
        },
        {
            $lookup: {
                from: 'screens',
                localField: 'screen',
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
            $skip: skip
        },
        {
            $limit: limit
        },
        {
            $unset: [
                '__v',
                'createdAt',
                'updatedAt',
                'movieDetails._id',
                'screenDetails._id',
                'screenDetails.theater',
                'theaterDetails._id',
                'theaterDetails.owner'
            ]
        }
    ])

    return shows
}

const findShowsByKeyword = async (keyword, limit, page) => {
    const skip = (page - 1) * limit

    try {
        const shows = await showModel.aggregate(
            [
                {
                    $lookup: {
                        from: 'movies',
                        localField: 'movie',
                        foreignField: '_id',
                        as: 'movieDetails'
                    }
                },
                {
                    $unwind: '$movieDetails'
                },
                {
                    $lookup: {
                        from: 'screens',
                        localField: 'screen',
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
                    $match: {
                        $or: [
                            { 
                                'movieDetails.title': { 
                                    $regex: keyword, 
                                    $options: 'i' 
                                } 
                            },
                            { 
                                'theaterDetails.location.city': { 
                                    $regex: keyword, 
                                    $options: 'i' 
                                } 
                            },
                            { 
                                'theaterDetails.location.district': { 
                                    $regex: keyword, 
                                    $options: 'i' 
                                } 
                            }
                        ]
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                {
                    $unset: [
                        '__v',
                        'createdAt',
                        'updatedAt',
                        'movieDetails._id',
                        'screenDetails._id',
                        'screenDetails.theater',
                        'theaterDetails._id',
                        'theaterDetails.owner'
                    ]
                }
            ]
        )
        
        return shows
    }
    catch(error) {
        throw error
    }
}

module.exports = {
    findShowById,
    findShow,
    createANewShow,
    getAllAvailableShowsFromToday,
    findShowsByKeyword
}