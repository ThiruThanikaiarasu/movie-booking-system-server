const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's full name.
 *           example: John Doe
 *           minLength: 2
 *           maxLength: 50
 *         email:
 *           type: string
 *           description: The user's email address.
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           minLength: 8
 *           maxLength: 24
 *           example: 'Password123!'
 *         role:
 *           type: string
 *           description: The user's role in the system.
 *           enum: [user, admin]
 *           default: user
 *       required:
 *         - name
 *         - email
 *         - password
 */

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            trim: true, 
            minLength: [2, "Name must be at least 2 characters long"],
                maxLength: [50, "Name must be no longer than 50 characters"]
        },
        email: {
            type: String, 
            unique: true,
            trim: true,
            required: [true, "Email is a mandatory field"]
        },
        password: {
            type: String, 
            select: false,
            required: [true, "Password is a mandatory field"],
        },
        role: {
            type: String, 
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
    },
    {
        collection: 'users'
    }
)

module.exports = mongoose.model.users || mongoose.model('users', userSchema)