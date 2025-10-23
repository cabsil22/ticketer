const routes = require('express').Router();
const customerRoutes = require('./customers')
const ticketRoutes = require('./tickets')

// my app routes
routes.use("/customers", customerRoutes);
routes.use("/tickets", ticketRoutes);

module.exports = { routes }