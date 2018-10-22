const jwt = require('jsonwebtoken');
const catchHandling = require('../helpers/catchHandling');
const userModel = require('../database/models/user');
const {
  SUCCESS,
  CLIENT_ERROR
} = require('../constants/httpStatus');
const config = require('./../config');

const auth = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email, password })
    .then(user => {
      if (!user) return res.status(CLIENT_ERROR.badRequest.code)
        .send(CLIENT_ERROR.badRequest);
      
      const token = jwt.sign(
        { email, password },
        config.secret,
        { expiresIn: config.expiresToken }
      );
      res.status(SUCCESS.ok.code).json({ user, token });
    })
    .catch(e => catchHandling(e, res));
};

module.exports = auth;
