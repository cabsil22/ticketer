const customerRoutes = require('express').Router();
const { allCustomers, upsertCustomer} = require('../controllers/customers')


customerRoutes.get('/', allCustomers)
customerRoutes.post('/', upsertCustomer)




module.exports = customerRoutes