const { initDb } = require("../db/db");
const { ObjectId } = require("mongodb");

async function allCustomers(req, res) {
  // #swagger.tags = ['Customers']  
  // #swagger.description = 'Retrieve a list of all customers.'
  res.send("Get all Customers");
}

async function upsertCustomer(req, res) {
    // #swagger.tags = ['Customers']  
    // #swagger.description = 'Create or update a customer.'
    res.send("Insert or Update customer.")

}

module.exports = {
  allCustomers,
  upsertCustomer,
};
