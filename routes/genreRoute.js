const express = require('express')
const router = express.Router()

const validateRequest = require('../middleware/validateRequest')
const { genreSchema } = require('../validators/genreValidator')
const { addGenre } = require('../controllers/genreController')
const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware')

/**
 * @swagger
 * /genre:
 *   post:
 *     summary: Add a new genre
 *     description: Endpoint to add a new genre to the system.
 *     tags:
 *       - Genre
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genre:
 *                 type: string
 *                 description: Name of the genre.
 *                 example: "Action"
 *             required:
 *               - genre
 *     responses:
 *       201:
 *         description: Genre added successfully.
 *       400:
 *         description: Bad request, validation error.
 *       401:
 *         description: Unauthorized. Token not found or expired.
 *       403:
 *         description: Forbidden. User is not authorized.
 *       409:
 *         description: Conflict, Genre already exists.
 *       500:
 *         description: Internal server error.
 */

router.post(
    '/',

    verifyUser,
    verifyAdmin,

    validateRequest(genreSchema),

    addGenre
)

module.exports = router
