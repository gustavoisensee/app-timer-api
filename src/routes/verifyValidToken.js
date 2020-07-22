const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config');
const getToken = require('../helpers/getToken');
const { CLIENT_ERROR } = require('../constants/httpStatus');

const verifyValidToken = (router) => {
  router
    .get('*', (req, res, next) => {
      const token = getToken(req);
      if (!token) return res
        .status(CLIENT_ERROR.unauthorized.code)
        .json(CLIENT_ERROR.unauthorized);

      jwt.verify(token, jwtConfig.secret, (err) => {
        if (err) return res
          .status(CLIENT_ERROR.unauthorized.code)
          .json(CLIENT_ERROR.unauthorized);

        next();
      });
    });
};

module.exports = verifyValidToken;
