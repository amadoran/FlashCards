const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/rest_flashcard.js','./routes/rest_flashcard_topic.js','./routes/rest_topic.js']

swaggerAutogen(outputFile, endpointsFiles)