const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - duration
 *         - language
 *         - thumbnail
 *         - censorshipRating
 *         - releaseDate
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the movie
 *           minLength: 1
 *           maxLength: 100
 *           example: "Inception"
 *         genre:
 *           type: string
 *           description: Genre of the movie
 *           example: "Science Fiction"
 *         duration:
 *           type: integer
 *           description: Duration of the movie in minutes
 *           minimum: 1
 *           maximum: 300
 *           example: 148
 *         language:
 *           type: string
 *           description: Language of the movie
 *           example: "English"
 *         thumbnail:
 *           type: object
 *           description: Details about the movie's thumbnail image
 *           properties:
 *             originalname:
 *               type: string
 *               description: The original name of the thumbnail file
 *               example: "inception.jpg"
 *             size:
 *               type: integer
 *               description: Size of the thumbnail file in bytes
 *               example: 204800
 *             mimetype:
 *               type: string
 *               description: MIME type of the thumbnail file
 *               pattern: "^image/(jpeg|png|gif|webp|svg\\+xml)$"
 *               example: "image/jpeg"
 *             s3Key:
 *               type: string
 *               description: S3 Key for the thumbnail file
 *               example: "inception/inception.jpg"
 *         censorshipRating:
 *           type: string
 *           description: Censorship rating of the movie
 *           enum: ["U", "U/A", "A", "U/A 7+", "U/A 13+", "S"]
 *           example: "U/A 13+"
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Release date of the movie
 *           example: "2010-07-16"
 *         cast:
 *           type: array
 *           description: Cast members of the movie
 *           items:
 *             type: object
 *             required:
 *               - role
 *               - name
 *             properties:
 *               role:
 *                 type: string
 *                 description: Role of the cast member
 *                 enum: ["actor", "actress", "comedian"]
 *                 example: "actor"
 *               name:
 *                 type: string
 *                 description: Name of the cast member
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Leonardo DiCaprio"
 *         crew:
 *           type: array
 *           description: Crew members of the movie
 *           items:
 *             type: object
 *             required:
 *               - role
 *               - name
 *             properties:
 *               role:
 *                 type: string
 *                 description: Role of the crew member
 *                 enum: ["director", "producer", "writer", "editor", "cinematographer"]
 *                 example: "director"
 *               name:
 *                 type: string
 *                 description: Name of the crew member
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: "Christopher Nolan"
 *       example:
 *         title: "Inception"
 *         genre: "Science Fiction"
 *         duration: 148
 *         language: "English"
 *         thumbnail:
 *           originalname: "inception.jpg"
 *           size: 204800
 *           mimetype: "image/jpeg"
 *           s3Key: "inception/inception.jpg"
 *         censorshipRating: "U/A 13+"
 *         releaseDate: "2010-07-16"
 *         cast:
 *           - role: "actor"
 *             name: "Leonardo DiCaprio"
 *         crew:
 *           - role: "director"
 *             name: "Christopher Nolan"
 */

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is a mandatory field'],
            trim: true,
            minlength: [1, 'Title must be at least 1 characters long'],
            maxlength: [100, 'Title must not exceed 100 characters']
        },
        genre: {
            type: String, 
            required: [true, 'Genre is a mandatory field']
        },
        duration: {
            type: Number,
            required: [true, 'Duration is a mandatory field'],
            min: [1, 'Duration must be at least 1 minute'],
            max: [300, 'Duration must not exceed 300 minutes']
        },
        language: {
            type: String, 
            required: [true, 'Language is a mandatory field']
        },
        thumbnail: {
            originalname: {
                type: String,
                required: [true, 'Thumbnail Originalname is a mandatory field'],
                trim: true,
            },
            size: {
                type: Number,
                required: [true, 'Thumbnail Size is a mandatory field'],
            },
            mimetype: {
                type: String,
                required: [true, 'Thumbnail Mimetype is a mandatory field'],
                match: [
                    /^image\/(jpeg|png|gif|webp|svg\+xml)$/,
                    'Invalid MIME type. Allowed types are: jpeg, png, gif, webp, svg+xml'
                ],
            },
            s3Key: {
                type: String,
                required: [true, 'Thumbnail S3Key is a mandatory field'],
                trim: true,
            }
        },
        censorshipRating: {
            type: String, 
            enum: {
                values: ["U", "U/A", "A", "U/A 7+", "U/A 13+", "S"],
                message: 'Invalid censorship rating. Allowed ratings are: U, U/A, A, U/A 7+, U/A 13+, S'
            },
            required: [true, 'Censorship rating is a mandatory field']
        },
        releaseDate: {
            type: Date,
            required: [true, 'Release date is a mandatory field']
        },
        cast: [
            {
                role: {
                    type: String,
                    required: [true, 'Role is a mandatory field for cast'],
                    enum: {
                        values: ['actor', 'actress', 'comedian'],
                        message: 'Role must be either actor, actress, or comedian'
                    },
                    set: function(value) {
                        return value.toLowerCase()
                    }
                },
                name: {
                    type: String,
                    required: [true, 'Cast member name is a mandatory field'],
                    trim: true,
                    minlength: [2, 'Cast member name must be at least 2 characters long'],
                    maxlength: [50, 'Cast member name must not exceed 50 characters']
                }
            }
        ],
        crew: [
            {
                role: {
                    type: String,
                    required: [true, 'Role is a mandatory field for crew'],
                    enum: {
                        values: ['director', 'producer', 'writer', 'editor', 'cinematographer'],
                        message: 'Role must be one of director, producer, writer, editor, cinematographer'
                    },
                    set: function(value) {
                        return value.toLowerCase()
                    }
                },
                name: {
                    type: String,
                    required: [true, 'Crew member name is a mandatory field'],
                    trim: true,
                    minlength: [2, 'Crew member name must be at least 2 characters long'],
                    maxlength: [50, 'Crew member name must not exceed 50 characters']
                }
            }
        ]
    },
    {
        timestamps: true
    },
    {
        collection: 'movies'
    }
)

module.exports = mongoose.model.movies || mongoose.model("movies", movieSchema)