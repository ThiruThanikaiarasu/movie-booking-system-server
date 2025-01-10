const { setResponseBody } = require("../utils/responseFormatter")

 const validateRequest = (schema) => {
    return (request, response, next) => {
        const { error } = schema.validate(request.body)
        if (error) {
            return response.status(400).send(setResponseBody(error.details[0].message, "validation_error", null))
        }
        next()
    }
}
  
module.exports = validateRequest
  