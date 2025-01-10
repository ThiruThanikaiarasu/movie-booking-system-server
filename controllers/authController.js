const { setResponseBody } = require("../utils/responseFormatter")
const { findUserByEmail, createUser, validatePassword, findUserByEmailWithPassword } = require('../services/userService')
const { generateToken, setTokenCookie } = require("../services/tokenServices")


const signup = async (request, response) => {
    const { name, email, password } = request.body

    try{
        const existingUser = await findUserByEmail(email)
        if(existingUser) {
            return response.status(409).send(setResponseBody("Email id already exist", "existing_email", null))
        }

        const newUser = {
                    name, 
                    email, 
                    password, 
            }
        
        const userToBeRegistered = await createUser(newUser)

        const token = generateToken(userToBeRegistered)
        setTokenCookie(response, token)

        const {password: userPassword, __v: userVersion, _id: userId, ...userData} = userToBeRegistered._doc
        response.status(201).send(setResponseBody("User Created Successfully", null, userData))
    } 
    catch(error) {
        response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
}

const login = async (request, response) => {
    const { email, password } = request.body 

    try{
        const existingUser = await findUserByEmailWithPassword(email)
        if(!existingUser) {
            return response.status(401).send(setResponseBody("Invalid email address", "invalid_email", null))
        }

        const validPassword = await validatePassword(password, existingUser.password)
        if(!validPassword) {
            return response.status(401).send(setResponseBody("Invalid password", "invalid_password", null))
        }

       
        const {password: _, _id, __v, tenantId, createdAt, updatedAt, ...userData} = existingUser._doc

        const token = generateToken(existingUser)
        setTokenCookie(response, token)

        response.status(200).send(setResponseBody("Logged in Successfully", null, userData))
    } 
    catch(error) {
        response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
}

module.exports = {
    signup,
    login
}