require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerUI = require("swagger-ui-express")

const connect = require('./database/connection')
const swaggerSpec = require('./configurations/swaggerConfig')
const { CSS_URL } = require('./configurations/constants')

const authRoute = require('./routes/authRoute')
const languageRoute = require('./routes/languageRoute')
const genreRoute = require('./routes/genreRoute')
const movieRoute = require('./routes/movieRoute')


app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerSpec, {customCssUrl: CSS_URL}))

app.get('/', (request, response) => {
    response.status(200).send({ message : "Server running successfully"})
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/language', languageRoute)
app.use('/api/v1/genre', genreRoute)
app.use('/api/v1/movie', movieRoute)

connect() 
    .then( () => {
        try{
            app.listen(process.env.PORT, console.log(`Server is running at http://localhost:${process.env.PORT}`))
        } 
        catch(error) {
            console.log(`Can't connect to database : ${error}`)
        }
    })
    .catch(error => {
        console.log(`Error while connecting to database : ${error}`)
    })