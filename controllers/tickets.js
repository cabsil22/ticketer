const { initDb } = require("../db/db");
const { ObjectId } = require("mongodb");

async function allTickets(req, res) {
    // #swagger.tags = ['Tickets']  
    // #swagger.description = 'Get list of all tickets.'
  res.send("Get all Tickets");
}

async function upsertTicket(req, res) {
    // #swagger.tags = ['Tickets']  
    // #swagger.description = 'Create or update a ticket.'
    res.send("Insert or Update Ticket.")

}

module.exports = {
  allTickets,
  upsertTicket,
};
