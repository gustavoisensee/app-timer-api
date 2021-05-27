const HttpObject = (code: number, message: string) => ({ code, message });

export const  INFORMATIONAL = {
  continue: HttpObject(100, 'The data is being processed.')
};

export const SUCCESS = {
  ok: HttpObject(200, 'The request has succeeded.'),
  created: HttpObject(201, 'The resource has been created.')
};

export const CLIENT_ERROR = {
  badRequest: HttpObject(400, 'The request has no valid data.'),
  unauthorized: HttpObject(401, 'The token is invalid or expired.'),
  conflict: HttpObject(409, 'The request could not be completed due to a conflict.')
};

export const SERVER_ERROR = {
  internalServerError: HttpObject(500, 'Something went wrong.')
};
