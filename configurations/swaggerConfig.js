const path = require('path')
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.1.0', 
    info: {
      title: 'Movie Booking',
      version: '1.0.0',
      description: 'API documentation for Movie Booking',
      contact: {
        name: 'Thirunavukkarasu',
        email: 'thiru.thanikaiarasu@gmail.com',
      },
    },
    servers: [
      {
        url: `${process.env.SERVER_URL}/api/v1`, 
      },
    ],
    components: {
        securitySchemes: {
          SessionID: {
            type: 'apiKey',
            in: 'cookie',
            name: 'SessionID',
          },
        },
    },
    security: [
        {
          SessionID: [],
        },
      ],
  },
  apis: [
    path.join(__dirname, '/../routes/*.js'),
    path.join(__dirname, '/../models/*.js')

  ] 
}


const options = {
    customCss: '.swagger-ui .topbar { display: none }'
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = swaggerSpec