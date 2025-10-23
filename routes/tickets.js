const ticketRoutes = require('express').Router();
const { allTickets, upsertTicket } = require('../controllers/tickets')

ticketRoutes.get('/', allTickets)
ticketRoutes.post('/', upsertTicket)


module.exports = ticketRoutes