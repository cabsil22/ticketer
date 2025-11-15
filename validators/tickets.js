const validateTicket = (ticket) => {
    console.log("Validator ticket: ", ticket)
  let valid = false;
  let error = "";

  if (!ticket.subject || !ticket.customerId || !ticket.description) {
    return {
        valid: valid,
        error: "Missing data. subject, customerId, and descriptions are required."
    }
  }

  if (ticket.priority != "urgent" && ticket.priority != "normal"){
    return {
        valid: valid,
        error: "Choose a valid priority. urgent or normal"
    }
  }

  return {valid: true, error: error}
};


module.exports = {validateTicket}