const { initDb } = require("../db/db");
const { ObjectId } = require("mongodb");
const collectionName = "Customers";

async function allCustomers(req, res) {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Retrieve a list of all customers.'
  const collection = initDb().collection(collectionName);
  const documents = await collection.find({}).toArray();
  try {
    if (documents) {
      res.send(documents);
    } else {
      res.send("Get all Customers returned no data.");
    }
  } finally {
  }
}

async function getCustomer(req, res) {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Get customer details by ID.'
  res.send("Insert or Update customer.");
}

async function insertCustomer(req, res) {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Create or update a customer.'
  /* #swagger.parameters['id'] = {
    in: 'query',
    description: 'ID of the Customer',
    required: false,
  } */
  data = req.body;

  const collection = initDb().collection(collectionName);
  console.log("Customer controller create: ", data);
  const newDocument = await collection.insertOne(data);
  if (newDocument.acknowledged) {
    res.send(newDocument.insertedId);
  }
  else {
    res.send("Insert or Update customer failed to update or insert doc.");

  }

}


async function updateCustomer(req, res) {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Create or update a customer.'
  /* #swagger.parameters['id'] = {
    in: 'query',
    description: 'ID of the Customer',
    required: false,
  } */
  customerId = req.params.id
  data = req.body;

  const collection = initDb().collection("Contacts");
  console.log("Contacts model create: ", data);
  const newDocument = await collection.insertOne({$set: data});
  if (newDocument.acknowledged) {
    res.send(newDocument.insertedId);
  }
  else {
    res.send("Insert or Update customer failed to update or insert doc.");

  }

}


async function deleteCustomer(req, res) {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Delete a customer.'
  res.send("Insert or Update customer.");
}

module.exports = {
  allCustomers,
  insertCustomer,
  getCustomer,
  deleteCustomer,
  updateCustomer
};
