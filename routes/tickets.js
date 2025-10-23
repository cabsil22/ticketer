const ticketRoutes = require('express').Router();
const { allTickets, insertTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/tickets')

ticketRoutes.get('/', allTickets)
ticketRoutes.post('/', insertTicket)
ticketRoutes.get('/:id', getTicket)
ticketRoutes.delete('/:id', deleteTicket)
ticketRoutes.put('/:id', updateTicket)



module.exports = ticketRoutes