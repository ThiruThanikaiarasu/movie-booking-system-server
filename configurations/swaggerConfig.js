const path = require('path')
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.1.0', 
    info: {
      title: 'Opportune',
      version: '1.0.0',
      description: 'API documentation for Opportune',
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
  },
  apis: [
    path.join(__dirname, '/../routes/*.js'),
    path.join(__dirname, '/../models/*.js')

  ] 
}
console.log(path.join(__dirname, '/../routes/*.js'))
console.log(path.join(__dirname, '/../models/*.js'))

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = swaggerSpec