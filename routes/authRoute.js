const express = require('express')
const router = express.Router()

const { signup } = require('../controllers/authController')

/**
 * @swagger
 * /signup:
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
 *       200:
 *         description: Successfully signed up the user.
 *       400:
 *         description: Bad request, invalid parameters.
 *       500:
 *         description: Internal server error.
 */

router.post(
    '/signup',

    signup
)

module.exports = router