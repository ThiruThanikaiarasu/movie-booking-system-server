const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Screen:
 *       type: object
 *       required:
 *         - theater
 *         - name
 *         - seatRow
 *         - seatsPerRow
 *       properties:
 *         theater:
 *           type: string
 *           description: The ID of the theater where the screen is located (referencing a theater)
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: The name of the screen in the theater
 *           example: "IMAX Screen"
 *           minLength: 2
 *           maxLength: 50
 *           messages:
 *             "string.min": "Screen name must be at least 2 characters long"
 *             "string.max": "Screen name must not exceed 50 characters"
 *         seatRow:
 *           type: number
 *           description: The number of rows of seats in the screen
 *           example: 10
 *           minimum: 1
 *           maximum: 100
 *           messages:
 *             "number.min": "At least 1 seat row is required"
 *             "number.max": "No more than 100 seat rows are allowed"
 *         seatsPerRow:
 *           type: number
 *           description: The number of seats per row in the screen
 *           example: 15
 *           minimum: 1
 *           maximum: 100
 *           messages:
 *             "number.min": "At least 1 seat per row is required"
 *             "number.max": "No more than 100 seats per row are allowed"
 *       additionalProperties: false
 */

const screenSchema = new mongoose.Schema(
    {
        theater: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'theaters',
            required: [true, 'Theater ID is required'],
        },
        name: {
            type: String,
            trim: true,
            minlength: [2, 'Screen name must be at least 2 characters long'], 
            maxlength: [50, 'Screen name must not exceed 50 characters'],
        },
        seatRow: {
            type: Number,
            required: [true, 'Number of seat rows is required'],
            min: [1, 'At least 1 seat row is required'], 
            max: [100, 'No more than 100 seat rows are allowed'],
        },
        seatsPerRow: {
            type: Number,
            required: [true, 'Number of seats per row is required'], 
            min: [1, 'At least 1 seat per row is required'],
            max: [100, 'No more than 100 seats per row are allowed'], 
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'screens'
    }
)

module.exports = mongoose.model.screens || mongoose.model("screens", screenSchema)