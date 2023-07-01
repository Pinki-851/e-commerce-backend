const { Constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case Constants.NOT_FOUND:
      res.json({ title: "Not found", message: err.message });
      break;
    case Constants.FORBIDDEN:
      res.json({ title: "Forbidden", message: err.message });
      break;
    case Constants.UNAUTHORIZED:
      res.json({ title: "unauthorized", message: err.message });
      break;
    case Constants.VALIDATION_ERR:
      res.json({ title: "Validation failed", message: err.message });
      break;
    case Constants.SERVER_ERR:
      res.json({ title: "internal server error", message: err.message });
    default:
      break;
  }
  res.json({ message: err.message });
};
module.exports = errorHandler;
