const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

userSchema.pre('save', function(next) {
    const user = this

    if(!user.isModified('password')) return next()
    bcrypt.genSalt(10, (error, salt) => {
        if(error) return next(error)

        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) return next(error)

            user.password = hash
            next()
        })
    })
})

userSchema.methods.generateAccessJWT = function() {
    let payload = { id : this._id}
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '30d'})
}

module.exports = mongoose.model.users || mongoose.model('users', userSchema)