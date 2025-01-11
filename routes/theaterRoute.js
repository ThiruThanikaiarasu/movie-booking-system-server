const express = require('express')
const router = express.Router()

const validateRequest = require('../middleware/validateRequest')
const { theaterSchema } = require('../validators/theaterValidator')
const { addTheater } = require('../controllers/theaterController')
const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware')


/**
 * @swagger
 * /theater:
 *   post:
 *     summary: Add a new theater
 *     description: Endpoint to add a new theater to the system.
 *     tags:
 *       - Theater
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the theater.
 *                 example: "Grand Cinema"
 *               location:
 *                 type: object
 *                 properties:
 *                   street1:
 *                     type: string
 *                     description: Street address line 1.
 *                     example: "123 Cinema Ave"
 *                   street2:
 *                     type: string
 *                     description: Street address line 2.
 *                     example: "Suite 4"
 *                   city:
 *                     type: string
 *                     description: City where the theater is located.
 *                     example: "Los Angeles"
 *                   district:
 *                     type: string
 *                     description: District or neighborhood.
 *                     example: "Hollywood"
 *                   state:
 *                     type: string
 *                     description: State where the theater is located.
 *                     example: "California"
 *                   country:
 *                     type: string
 *                     description: Country where the theater is located.
 *                     example: "USA"
 *                   zip:
 *                     type: string
 *                     description: ZIP code of the theater location.
 *                     example: "90028"
 *                   landmark:
 *                     type: string
 *                     description: A notable landmark near the theater.
 *                     example: "Near the Hollywood Walk of Fame"
 *             required:
 *               - name
 *               - owner
 *               - location
 *     responses:
 *       201:
 *         description: Theater added successfully.
 *       400:
 *         description: Bad request, validation error.
 *       401:
 *         description: Unauthorized. Token not found or expired.
 *       403:
 *         description: Forbidden. User is not authorized.
 *       409:
 *         description: Conflict, Theater already exists.
 *       500:
 *         description: Internal server error.
 */

router.post(
    '/',

    verifyUser,
    verifyAdmin,

    validateRequest(theaterSchema),

    addTheater
)

module.exports = router