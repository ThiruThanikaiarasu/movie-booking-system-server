const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - user
 *         - show
 *         - seats
 *         - totalPrice
 *         - bookingStatus
 *         - paymentStatus
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who made the booking (referencing a user)
 *           example: "60b7f7b5f77bfa001c2d9f1c"
 *         show:
 *           type: string
 *           description: The ID of the show for which the booking is made (referencing a screen/show)
 *           example: "60b7f7b5f77bfa001c2d9f1d"
 *         seats:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of seats that have been booked
 *           example: ["A1", "A2", "A3"]
 *         totalPrice:
 *           type: number
 *           description: The total price for the booking
 *           example: 1500
 *         bookingStatus:
 *           type: string
 *           enum:
 *             - booked
 *             - cancelled
 *           description: The status of the booking
 *           example: "booked"
 *         paymentStatus:
 *           type: string
 *           enum:
 *             - success
 *             - pending
 *             - failure
 *           description: The payment status of the booking
 *           example: "pending"
 *       additionalProperties: false
 */

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: [true, 'User ID is required'],
        },
        show: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'screens',
            required: [true, 'Show ID is required'],
        },
        seats: {
            type: [ String ],
            required: [true, 'Seats are required'],
            validate: {
                validator: function (value) {
                    return value.length > 0
                },
                message: 'At least one seat must be selected'
            }
        },
        totalPrice: {
            type: Number,
            required: [true, 'Total price is required'],
            min: [0, 'Total price cannot be negative']
        },
        bookingStatus: {
            type: String,
            enum: ["booked", "cancelled"],
            default: "booked"
        },
        paymentStatus: {
            type: String, 
            enum: ["success", "pending", "failure"],
            default: "pending"
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'bookings'
    }
)

module.exports = mongoose.model.bookings || mongoose.model("bookings", bookingSchema)