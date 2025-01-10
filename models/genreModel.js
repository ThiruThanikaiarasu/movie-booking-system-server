const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - genre
 *       properties:
 *         genre:
 *           type: string
 *           description: The name of the genre
 *           minLength: 2
 *           maxLength: 50
 *           example: "Action"
 *       example:
 *         genre: "Action"
 */

const genresSchema = new mongoose.Schema(
    {
        genre: {
            type: String,
            required: [true, 'Genre name is mandatory'],
            trim: true,
            minlength: [2, 'Genre name must be at least 2 characters long'],
            maxlength: [50, 'Genre name must not exceed 50 characters']
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'genres'
    }
)

module.exports = mongoose.model.genres || mongoose.model("genres", genresSchema)