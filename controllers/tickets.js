const { initDb } = require("../db/db");
const { ObjectId } = require("mongodb");
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
    res.send("Insert or Update customer.")

}


async function updateTicket(req, res) {
    // #swagger.tags = ['Tickets']  
    // #swagger.description = 'Create or update a ticket.'
    res.send("Insert or Update Ticket.")

}


async function insertTicket(req, res) {
    // #swagger.tags = ['Tickets']  
    // #swagger.description = 'Create or update a ticket.'
      data = req.body;
    
      const collection = initDb().collection(collectionName);
      console.log("Tickets controller create: ", data);
      const newDocument = await collection.insertOne(data);
      if (newDocument.acknowledged) {
        res.send(newDocument.insertedId);
      }
      else {
        res.send("Insert ticket failed to insert item.");
    
      }
}


async function deleteTicket(req, res) {
    // #swagger.tags = ['Tickets']  
    // #swagger.description = 'Delete a Ticket.'
    res.send("Insert or Update customer.")

}

module.exports = {
  allTickets,
  updateTicket,
  getTicket,
  deleteTicket,
  insertTicket
};
