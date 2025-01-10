const express = require('express')
const router = express.Router()

const validateRequest = require('../middleware/validateRequest')
const { languageSchema } = require('../validators/languageValidator')
const { addLanguage } = require('../controllers/languageController')


/**
 * @swagger
 * /language:
 *   post:
 *     summary: Add a new language
 *     description: Endpoint to add a new language to the system.
 *     tags:
 *       - Language
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *                 description: English name of the language.
 *                 example: "English"
 *             required:
 *               - language
 *     responses:
 *       201:
 *         description: Language added successfully.
 *       400:
 *         description: Bad request, validation error.
 *       409:
 *         description: Conflict, Language already exist.
 *       500:
 *         description: Internal server error.
 */

router.post(
    '/',

    validateRequest(languageSchema),

    addLanguage
)

module.exports = router