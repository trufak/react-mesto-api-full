const { constants } = require('http2');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
};
