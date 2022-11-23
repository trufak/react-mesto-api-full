const { constants } = require('http2');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
};
