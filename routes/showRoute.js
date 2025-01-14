const express = require('express')
const router = express.Router()

const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware')
const { addShow, getAllAvailableShow, searchAvailableShowsByKeyword } = require('../controllers/showController')
const validateRequest = require('../middleware/validateRequest')
const { showSchema } = require('../validators/showValidator')


/**
 * @swagger
 * /show:
 *   post:
 *     summary: Create a new movie show
 *     description: This endpoint creates a new movie show by providing details such as screen, movie, showTime, and price. Requires user verification and admin privileges.
 *     tags:
 *       - Shows
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               screen:
 *                 type: string
 *                 description: The ID of the screen where the show will be held.
 *                 example: 6781f9ce08a29a4f45ac71b1
 *               movie:
 *                 type: string
 *                 description: The ID of the movie to be shown.
 *                 example: 6782093f136e6a4ceaf77fba
 *               showTime:
 *                 type: string
 *                 format: date-time
 *                 description: The show time in ISO 8601 format (e.g., 2025-01-11T10:00:00.000Z).
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price for the show ticket.
 *                 example: 150.0
 *             required:
 *               - screen
 *               - movie
 *               - showTime
 *               - price
 *     responses:
 *       201:
 *         description: Show created successfully
 *       400:
 *         description: Validation, error missing required fields or invalid format.
 *       409:
 *         description: Conflict, the show already exists.
 *       404:
 *         description: Not Found, screen or movie not found.
 *       401:
 *         description: Unauthorized, invalid user authentication.
 *       403:
 *         description: Forbidden, only admin users can create a show
 *       500:
 *         description: Internal server error.
 */

router.post(
    '/',

    verifyUser,
    verifyAdmin,

    validateRequest(showSchema),

    addShow
)


/**
 * @swagger
 * /show:
 *   get:
 *     summary: Get all available shows for today and after
 *     description: Fetches all the shows that are scheduled for today and after.
 *     tags:
 *       - Shows
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Number of results per page.
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: page
 *         description: The page number.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Shows retrieved successfully.
 *       404:
 *         description: No available shows found for today and after.
 *       500:
 *         description: Internal server error.
 */

router.get(
    '/',

    getAllAvailableShow
)

/**
 * @swagger
 * /show/search:
 *   get:
 *     summary: Search available shows by keyword with pagination
 *     description: Search for available shows by a keyword and paginate the results.
 *     tags:
 *       - Shows
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         description: The keyword to search for in movie titles and theater cities.
 *         schema:
 *           type: string
 *           example: "chennai"
 *       - in: query
 *         name: limit
 *         description: Number of results per page.
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: page
 *         description: The page number.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved shows.
 *       400:
 *         description: Bad request, missing or invalid parameters.
 *       404:
 *         description: No shows found for the given keyword.
 *       500:
 *         description: Internal server error.
 */

router.get(
    '/search',

    searchAvailableShowsByKeyword
)

module.exports = router