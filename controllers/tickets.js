const { initDb } = require("../db/db");
const { ObjectId } = require("mongodb");
const { validateTicket } = require("../validators/tickets");
const collectionName = "Tickets";

async function allTickets(req, res) {
  // #swagger.tags = ['Tickets']
  // #swagger.description = 'Get list of all tickets.'
  const collection = initDb().collection(collectionName);
  const documents = await collection.find({}).toArray();
  try {
    if (documents) {
      res.send(documents);
    } else {
      res.send("Get all Tickets returned no data.");
    }
  } finally {
  }
}

async function getTicket(req, res) {
  // #swagger.tags = ['Tickets']
  // #swagger.description = 'Get Ticket Details by ID'
  res.send("Insert or Update customer.");
}

async function updateTicket(req, res) {
  // #swagger.tags = ['Tickets']
  // #swagger.description = 'Update a ticket.'
  /* #swagger.parameters['id'] = {
    in: 'query',
    description: 'ID of the Customer',
    required: true,
  } */
  ticketId = req.params.id;
  data = req.body;

    validation = validateTicket(data);
  if (!validation.valid) {
    res.send(validation.error);
    return;
  }

  const collection = initDb().collection("Tickets");
  console.log("Tickets model update: ", data);
  const newDocument = await collection.updateOne(
    { "_id": new ObjectId(ticketId) },
    { $set: data }
  );
  if (newDocument.acknowledged) {
    res.send(newDocument);
  } else {
    res.send("Update ticket failed.");
  }
}

async function insertTicket(req, res) {
  // #swagger.tags = ['Tickets']
  // #swagger.description = 'Create or update a ticket.'
  data = req.body;

    validation = validateTicket(data);
  if (!validation.valid) {
    res.send(validation.error);
    return;
  }

  const collection = initDb().collection(collectionName);
  console.log("Tickets controller create: ", data);
  const newDocument = await collection.insertOne(data);
  if (newDocument.acknowledged) {
    res.send(newDocument.insertedId);
  } else {
    res.send("Insert ticket failed to insert item.");
  }
}

async function deleteTicket(req, res) {
  // #swagger.tags = ['Tickets']
  // #swagger.description = 'Delete a Ticket.'

  ticketId = req.params.id;

  const collection = initDb().collection("Tickets");
  const result = await collection.deleteOne({ "_id": new ObjectId(ticketId) });
  if (result) {
    res.send(result);
  } else {
    res.send("Delete ticket failed.");
  }
}

module.exports = {
  allTickets,
  updateTicket,
  getTicket,
  deleteTicket,
  insertTicket,
};
