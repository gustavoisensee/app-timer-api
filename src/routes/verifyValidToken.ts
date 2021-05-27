import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import getToken from '../helpers/getToken';
import { CLIENT_ERROR } from '../constants/httpStatus';

const init = (router: Router) => {
  router
    .get('*', (req, res, next) => {
      const token = getToken(req);
      if (!token) return res
        .status(CLIENT_ERROR.unauthorized.code)
        .json(CLIENT_ERROR.unauthorized);

      jwt.verify(token, config.jwt.secret, (err) => {
        if (err) return res
          .status(CLIENT_ERROR.unauthorized.code)
          .json(CLIENT_ERROR.unauthorized);

        next();
      });
    });
};

export default init;
