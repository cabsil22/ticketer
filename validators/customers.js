const validateCustomer = (customer) => {
    console.log("Validator customer: ", customer)
  let valid = false;
  let error = "";
  if (!customer.firstName || !customer.lastName || !customer.email) {
    return {
        valid: valid,
        error: "Missing data. firstName, lastName, and email are all required."
    }
  }

  return {valid: true, error: error}
};


module.exports = {validateCustomer}