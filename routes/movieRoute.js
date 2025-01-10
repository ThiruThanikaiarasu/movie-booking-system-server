const express = require('express')
const router = express.Router()

const { verifyUser, verifyAdmin } = require('../middleware/authMiddleware')
const validateRequest = require('../middleware/validateRequest')
const upload = require('../middleware/fileUpload')
const { movieValidator } = require('../validators/movieValidator')
const { createMovie } = require('../controllers/movieController')


router.post(
    "/",

    verifyUser,
    verifyAdmin,

    upload.single('thumbnail'),

    validateRequest(movieValidator),

    createMovie
)

module.exports = router