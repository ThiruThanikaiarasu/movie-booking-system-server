const express = require('express')
const router = express.Router()

const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware')
const validateRequest = require('../middleware/validateRequest')
const { addScreen } = require('../controllers/screenController')
const { screenSchema } = require('../validators/screenValidator')


/**
 * @swagger
 * /screen:
 *   post:
 *     summary: Add a new screen to the theater
 *     description: Endpoint to add a new screen to the specified theater.
 *     tags:
 *       - Screen
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - theater
 *               - name
 *               - seatRow
 *               - seatsPerRow
 *             properties:
 *               theater:
 *                 type: string
 *                 description: The ID of the theater where the screen will be added (referencing a theater)
 *                 example: "507f1f77bcf86cd799439011"
 *               name:
 *                 type: string
 *                 description: The name of the screen within the theater
 *                 example: "IMAX Screen"
 *               seatRow:
 *                 type: number
 *                 description: The number of rows of seats in the screen
 *                 example: 10
 *               seatsPerRow:
 *                 type: number
 *                 description: The number of seats per row in the screen
 *                 example: 15
 *     responses:
 *       201:
 *         description: Screen added successfully.
 *       400:
 *         description: Bad request, validation error.
 *       401:
 *         description: Unauthorized. Token not found or expired.
 *       403:
 *         description: Forbidden. User is not authorized.
 *       409:
 *         description: Conflict. Screen already exists.
 *       500:
 *         description: Internal server error.
 */

router.post(
    '/',

    verifyUser,
    verifyAdmin,

    validateRequest(screenSchema),

    addScreen
)

module.exports = router