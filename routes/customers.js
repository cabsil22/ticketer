const customerRoutes = require('express').Router();
const { allCustomers, insertCustomer, updateCustomer, getCustomer, deleteCustomer} = require('../controllers/customers')
const { authenticateToken } = require('../middleware/auth')

customerRoutes.get('/', authenticateToken, allCustomers)
customerRoutes.post('/', authenticateToken, insertCustomer)
customerRoutes.get('/:id', authenticateToken, getCustomer)
customerRoutes.delete('/:id', authenticateToken, deleteCustomer)
customerRoutes.put('/:id', authenticateToken, updateCustomer)



module.exports = customerRoutes