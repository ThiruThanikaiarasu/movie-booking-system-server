const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       required:
 *         - screen
 *         - movie
 *         - showTime
 *         - price
 *         - seatMap
 *       properties:
 *         screen:
 *           type: string
 *           description: The ID of the screen where the show will be held (referencing a screen)
 *           example: "507f1f77bcf86cd799439011"
 *         movie:
 *           type: string
 *           description: The ID of the movie being shown (referencing a movie)
 *           example: "507f1f77bcf86cd799439022"
 *         showTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the show will start
 *           example: "2025-01-15T19:30:00Z"
 *         price:
 *           type: number
 *           description: The price of the ticket for the show
 *           example: 15.50
 *         seatMap:
 *           type: object
 *           description: A map of seat availability (seat number -> availability status)
 *           additionalProperties:
 *             type: string
 *           example:
 *             "A1": "1001000001"
 *             "A2": "1100000011"
 *             "A3": "1100011110"
 *       additionalProperties: false
 */

const showSchema = new mongoose.Schema(
    {
        screen: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'screens',
            required: [true, 'Screen ID is required'],
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'movies',
            required: [true, 'Movie ID is required'],
        },
        showTime: {
            type: Date,
            required: [true, 'Show time is required'],
            validate: {
                validator: function(value) {
                    return value instanceof Date && !isNaN(value)  
                },
                message: 'Invalid show time'
            }
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be less than 0'],
        },
        seatMap: {
            type: Map,
            of: String,
            required: [true, 'Seat map is required'],
            validate: {
                validator: function(value) {
                    return Object.keys(value).length > 0
                },
                message: 'Seat map cannot be empty'
            }
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'shows'
    }
)

module.exports = mongoose.model.shows || mongoose.model("shows", showSchema)