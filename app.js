const express = require("express");
const app = express();
const cors = require("cors");
const { routes } = require("./routes");
const environment = require("dotenv").config();
const defaultPort = process.env.PORT || 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

process.on('uncaughtException', (error, origin) => {
  console.log("###########################################")
  console.log("There was an uncaught exception in the: ", origin);
  console.log(error);
  console.log("###########################################")
})

// set up express to handle JSON and CORS
app.use(express.json());
app.use(cors());

app.use('/', routes)
// swagger docs routes
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument))


// start the app listening
app.listen(defaultPort, () => {
  console.log("Web Server is listening at port " + defaultPort);
});
