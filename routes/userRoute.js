const express = require('express')
const { verifyUser } = require('../middleware/authMiddleware')
const { getAllBookings } = require('../controllers/userController')
const router = express.Router()


/**
 * @swagger
 * /user/bookings:
 *   get:
 *     summary: Get all bookings of the user
 *     description: This API allows a user to retrieve all of their bookings.
 *     tags:
 *       - Booking
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings.
 *       401:
 *         description: Unauthorized. Token not found or expired.
 *       404:
 *         description: Not Found. No Booking found.
 *       500:
 *         description: Internal server error.
 */


router.get(
    '/bookings',

    verifyUser,

    getAllBookings
)

module.exports = router