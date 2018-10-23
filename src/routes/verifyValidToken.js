const jwt = require('jsonwebtoken');
const config = require('../config');
const getToken = require('../helpers/getToken');
const { CLIENT_ERROR } = require('../constants/httpStatus');

const verifyValidToken = (router) => {
  router
    .get('*', (req, res, next) => {
      const token = getToken(req);
      if (!token) return res
        .status(CLIENT_ERROR.unauthorized.code)
        .send(CLIENT_ERROR.unauthorized);
      
      jwt.verify(token, config.secret, (err) => {
        if (err) return res
          .status(CLIENT_ERROR.unauthorized.code)
          .send(CLIENT_ERROR.unauthorized);
        
        next();
      });
    });
};

module.exports = verifyValidToken;
