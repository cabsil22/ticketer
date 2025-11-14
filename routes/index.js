const environment = require("dotenv").config();
const routes = require('express').Router();
const customerRoutes = require('./customers')
const ticketRoutes = require('./tickets')
const oAuthRoutes = require('./oAuth')




// my app routes
routes.use("/customers", customerRoutes);
routes.use("/tickets", ticketRoutes);
routes.use("/oAuth", oAuthRoutes);

module.exports = { routes }