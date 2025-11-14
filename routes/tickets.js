const ticketRoutes = require('express').Router();
const { allTickets, insertTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/tickets')
const { authenticateToken } = require('../middleware/auth')

ticketRoutes.get('/', authenticateToken, allTickets)
ticketRoutes.post('/', authenticateToken, insertTicket)
ticketRoutes.get('/:id', authenticateToken, getTicket)
ticketRoutes.delete('/:id', authenticateToken, deleteTicket)
ticketRoutes.put('/:id', authenticateToken, updateTicket)



module.exports = ticketRoutes