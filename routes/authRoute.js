const express = require('express')
const router = express.Router()

const { signup, login, logout } = require('../controllers/authController')
const validateRequest = require('../middleware/validateRequest')
const { signupSchema, loginSchema } = require('../validators/userValidator')
const { verifyUser } = require('../middleware/authMiddleware')

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     description: Endpoint to register a new user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's full name.
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 format: email
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 minLength: 8
 *                 maxLength: 24
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Successfully signed up the user.
 *       400:
 *         description: Bad request, invalid parameters.
 *       409:
 *         description: Conflict, Email Id already exist.
 *       500:
 *         description: Internal server error.
 */

router.post(
    '/signup',

    validateRequest(signupSchema),

    signup
)


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Allows users to log in by providing their credentials (username, password).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *       400:
 *         description: Bad Request, validation error
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.post(
    '/login',

    validateRequest(loginSchema),

    login
)


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logs the user out by invalidating the SessionID cookie.
 *     security:
 *       - cookieAuth: []  # This defines that the endpoint uses cookies for authentication.
 *     responses:
 *       200:
 *         description: Successfully logged out, session ended.
 *       400:
 *         description: Bad Request, validation or cookie error
 *       401:
 *         description: Unauthorized, no valid session
 *       500:
 *         description: Internal Server Error
 */

router.post(
    '/logout',

    verifyUser,

    logout
)

module.exports = router