const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
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