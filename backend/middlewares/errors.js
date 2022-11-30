const errorMessages = require('../utils/errorMessages');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .send({ message: statusCode ? errorMessages.serverError : err.message });
  next();
};
