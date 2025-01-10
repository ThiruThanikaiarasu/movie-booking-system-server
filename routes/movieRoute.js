const express = require('express')
const router = express.Router()

const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware')
const validateRequest = require('../middleware/validateRequest')
const upload = require('../middleware/fileUpload')
const { movieValidator } = require('../validators/movieValidator')
const { createMovie } = require('../controllers/movieController')


/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: Add a new movie to the system
 *     tags:
 *       - Movies
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the movie
 *                 example: "Inception"
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of genres of the movie
 *                 example: ["Science Fiction", "Action"]
 *               duration:
 *                 type: integer
 *                 description: Duration of the movie in minutes
 *                 example: 148
 *               language:
 *                 type: string
 *                 description: Language of the movie
 *                 example: "English"
 *               censorshipRating:
 *                 type: string
 *                 description: Censorship rating of the movie
 *                 example: "U/A"
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Release date of the movie
 *                 example: "2010-07-16"
 *               cast:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       description: Role of the cast member
 *                       example: "actor"
 *                     name:
 *                       type: string
 *                       description: Name of the cast member
 *                       example: "Leonardo DiCaprio"
 *               crew:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       description: Role of the crew member
 *                       example: "director"
 *                     name:
 *                       type: string
 *                       description: Name of the crew member
 *                       example: "Christopher Nolan"
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image for the movie
 *     responses:
 *       201:
 *         description: Movie added successfully
 *       400:
 *         description: Validation error (e.g., invalid genre or language)
 *       401:
 *         description: Unauthorized. Token not found or expired.
 *       403:
 *         description: Forbidden. User is not authorized.
 *       409:
 *         description: Movie already exists
 *       500:
 *         description: Internal server error
 *       503: 
 *         description: S3Transaction error, try again later
 */

router.post(
    "/",

    verifyUser,
    verifyAdmin,

    upload.single('thumbnail'),

    validateRequest(movieValidator),

    createMovie
)

module.exports = router