const { setResponseBody } = require("../utils/responseFormatter")
const { findUserByEmail, createUser } = require('../services/userService')
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

module.exports = {
    signup
}