const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Theater:
 *       type: object
 *       required:
 *         - name
 *         - owner
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the theater
 *           example: "Cineplex"
 *         owner:
 *           type: string
 *           description: The ID of the owner (referencing a user)
 *           example: "507f1f77bcf86cd799439011"
 *         location:
 *           type: object
 *           properties:
 *             street1:
 *               type: string
 *               description: The first line of the street address
 *               example: "123 Main Street"
 *             street2:
 *               type: string
 *               description: The second line of the street address (optional)
 *               example: "Apt 4B"
 *             city:
 *               type: string
 *               description: The city where the theater is located
 *               example: "Cityville"
 *             district:
 *               type: string
 *               description: The district or area within the city
 *               example: "Downtown"
 *             state:
 *               type: string
 *               description: The state or region of the location
 *               example: "Stateville"
 *             country:
 *               type: string
 *               description: The country where the theater is located
 *               example: "Countryland"
 *             zip:
 *               type: string
 *               description: The postal/zip code
 *               example: "12345"
 *             landmark:
 *               type: string
 *               description: A nearby landmark or point of reference
 *               example: "Near City Park"
 *       additionalProperties: false
 */

const theaterSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, 'Name is a mandatory field'], 
            minlength: [3, 'Name should be at least 3 characters'], 
            maxlength: [100, 'Name should not exceed 100 characters'], 
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: [true, 'Owner is a mandatory field'],
        },
        location: {
            street1: {
                type: String,
                required: [true, 'Street1 is a mandatory field'],
                minlength: [3, 'Street1 should be at least 3 characters'],
                maxlength: [100, 'Street1 should not exceed 100 characters'],
            },
            street2: {
                type: String,
                maxlength: [100, 'Street2 should not exceed 100 characters'],
            },
            city: {
                type: String,
                required: [true, 'City is a mandatory field'],
                minlength: [3, 'City should be at least 3 characters'],
                maxlength: [100, 'City should not exceed 100 characters'],
            },
            district: {
                type: String,
                required: [true, 'District is a mandatory field'],
                minlength: [3, 'District should be at least 3 characters'],
                maxlength: [100, 'District should not exceed 100 characters'],
            },
            state: {
                type: String,
                required: [true, 'State is a mandatory field'],
                minlength: [3, 'State should be at least 3 characters'],
                maxlength: [100, 'State should not exceed 100 characters'],
            },
            country: {
                type: String,
                required: [true, 'Country is a mandatory field'],
                minlength: [3, 'Country should be at least 3 characters'],
                maxlength: [100, 'Country should not exceed 100 characters'],
            },
            zip: {
                type: String,
                required: [true, 'Zip code is a mandatory field'],
                minlength: [5, 'Zip code should be at least 5 characters'],
                maxlength: [10, 'Zip code should not exceed 10 characters'],
            },
            landmark: {
                type: String,
                maxlength: [200, 'Landmark should not exceed 200 characters'],
            }
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'theaters'
    }
)

module.exports = mongoose.model.theaters || mongoose.model("theaters", theaterSchema)