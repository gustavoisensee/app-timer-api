const HttpObject = (code, message) => ({ code, message });

const httpStatus = {
  INFORMATIONAL: {
    continue: HttpObject(100, 'The data is being processed.')
  },
  SUCCESS: {
    ok: HttpObject(200, 'The request has succeeded.'),
    created: HttpObject(201, 'The resource has been created.')
  },
  CLIENT_ERROR: {
    badRequest: HttpObject(400, 'The request has no valid data.'),
    unauthorized: HttpObject(401, 'The token is invalid or expired.'),
    conflict: HttpObject(409, 'The request could not be completed due to a conflict.')
  },
  SERVER_ERROR: {
    internalServerError: HttpObject(500, 'Something went wrong.')
  }
};

module.exports = httpStatus;
