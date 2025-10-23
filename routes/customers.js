const customerRoutes = require('express').Router();
const { allCustomers, insertCustomer, updateCustomer, getCustomer, deleteCustomer} = require('../controllers/customers')


customerRoutes.get('/', allCustomers)
customerRoutes.post('/', insertCustomer)
customerRoutes.get('/:id', getCustomer)
customerRoutes.delete('/:id', deleteCustomer)
customerRoutes.put('/:id', updateCustomer)



module.exports = customerRoutes