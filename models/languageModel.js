const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Language:
 *       type: object
 *       required:
 *         - language
 *       properties:
 *         language:
 *           type: string
 *           description: The name of the language
 *           minLength: 2
 *           maxLength: 50
 *           example: "English"
 *       example:
 *         name: "English"
 */

const languageSchema = new mongoose.Schema(
    {
        language: {
            type: String,
            required: [true, 'Language name is mandatory'],
            trim: true,
            minlength: [2, 'Language name must be at least 2 characters long'],
            maxlength: [50, 'Language name must not exceed 50 characters']
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'languages'
    }
)

module.exports = mongoose.model.languages || mongoose.model("languages", languageSchema)