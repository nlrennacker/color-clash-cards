const ExtendableError = require("./ExtendableError");

class ApiNotFoundError extends ExtendableError {
  constructor(message) {
    super(message);
  }
}

module.exports = ApiNotFoundError;