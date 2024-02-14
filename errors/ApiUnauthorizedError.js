const ExtendableError = require("./ExtendableError");

class ApiUnauthorizedError extends ExtendableError {
  constructor(message) {
    super(message);
  }
}

module.exports = ApiUnauthorizedError;
