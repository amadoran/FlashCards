const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/rest_flashcard.js']

swaggerAutogen(outputFile, endpointsFiles)