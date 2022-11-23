const { constants } = require('http2');

module.exports = class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
};
