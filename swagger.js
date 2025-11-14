const swaggerAutogen = require('swagger-autogen')();
const environment = require("dotenv").config();
const HOST_PATH = process.env.HOST_PATH;

const doc = {
  info: {
    title: 'Ticketer API',
    description: 'API documentation for the Ticketer* application.'
  },
  host: HOST_PATH,
  schemes: ['https', 'http'],
  basePath: '/',

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },

  security: [
    {"bearerAuth": []}
  ]
  
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);