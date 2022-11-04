const ApiClientError = require("../errors/ApiClientError");
const ApiNotFoundError = require("../errors/ApiNotFoundError");

module.exports = function (err, req, res, next) {
  if (res.headersSent) {
    return next();
  }

  console.error(err);

  switch (true) {
    case err instanceof ApiClientError: {
      res.status(400).json({
        error: err.message,
      });
      break;
    }
    case err instanceof ApiNotFoundError: {
      res.status(404).json({
        error: err.message,
      });
      break;
    }
    default: {
      res.status(500).json({
        error: "Internal server error.",
      });
      break;
    }
  }
};