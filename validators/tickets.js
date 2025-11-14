const validateTicket = (ticket) => {
    console.log("Validator ticket: ", ticket)
  let valid = false;
  let error = "";
  if (!ticket.subject || !ticket.customerId || ticket.description) {
    return {
        valid: valid,
        error: "Missing data. subject and customerId are both required."
    }
  }

  return {valid: true, error: error}
};


module.exports = {validateTicket}