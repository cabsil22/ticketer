const { initDb } = require("../db/db");
const { ObjectId } = require("mongodb");
const { validateCustomer } = require("../validators/customers");
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

  validation = validateCustomer(data);
  if (!validation.valid) {
    res.status(400).send(validation.error);
    return;
  }

  const collection = initDb().collection(collectionName);
  console.log("Customer controller create: ", data);
  const newDocument = await collection.insertOne(data);
  if (newDocument.acknowledged) {
    res.send(newDocument.insertedId);
  } else {
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
  customerId = req.params.id;
  console.log(customerId);
  data = req.body;

  validation = validateCustomer(data);
  if (!validation.valid) {
    res.send(validation.error);
    return;
  }

  const collection = initDb().collection("Customers");
  console.log("Customer model update: ", data);
  newDocument = await collection.updateOne(
    { _id: new ObjectId(customerId) },
    { $set: data }
  );

  if (newDocument.acknowledged) {
    res.send(newDocument);
  } else {
    res.send("Update customer failed");
  }
}

async function deleteCustomer(req, res) {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Delete a customer.'
  customerId = req.params.id;
  console.log(customerId);

  const collection = initDb().collection("Customers");
  console.log("Customer model delete id: ", customerId);
  result = await collection.deleteOne({ _id: new ObjectId(customerId) });

  if (result) {
    res.send(result);
  } else {
    res.send("Delete customer failed");
  }
}

module.exports = {
  allCustomers,
  insertCustomer,
  getCustomer,
  deleteCustomer,
  updateCustomer,
};
