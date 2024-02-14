const ExtendableError = require("./ExtendableError");

class ApiForbiddenError extends ExtendableError {
  constructor(message) {
    super(message);
  }
}

module.exports = ApiForbiddenError;
