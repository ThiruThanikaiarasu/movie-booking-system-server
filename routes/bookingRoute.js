const express = require('express')
const router = express.Router()

const { verifyUser } = require('../middleware/authMiddleware')
const validateRequest = require('../middleware/validateRequest')
const { bookTickets } = require('../controllers/bookingController')
const { bookingSchema } = require('../validators/bookingValidator')


/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Book tickets for a show
 *     description: This API allows users to book tickets for a particular show by selecting seats.
 *     tags:
 *       - Booking
 *     requestBody:
 *       description: The information required to book tickets for a show.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               show:
 *                 type: string
 *                 description: The ID of the show to book tickets for.
 *                 example: '67820aa0eae8a62a1aa578b6'
 *               seats:
 *                 type: array
 *                 items:
 *                   type: string
 *                   pattern: '^[A-Za-z]+\d+$'
 *                   description: The list of seats to be booked (e.g., "A1", "B2").
 *                 minItems: 1
 *                 description: A list of selected seats for booking. At least one seat must be selected.
 *                 example: ["A1", "B2"]
 *             additionalProperties: false
 *     responses:
 *       201:
 *         description: Booking successfully created
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized. Token not found or expired.
 *       404:
 *         description: Show not found
 *       409:
 *         description: Conflict, seats not available
 *       500:
 *         description: Internal server error
 */

router.post(
    '/',

    verifyUser,

    validateRequest(bookingSchema),

    bookTickets
)

module.exports = router