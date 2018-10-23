const jwt = require('jsonwebtoken');
const catchHandling = require('../helpers/catchHandling');
const userModel = require('../database/models/user');
const {
  SUCCESS,
  CLIENT_ERROR
} = require('../constants/httpStatus');
const config = require('../config');

const login = (req, res) => {
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

const create = (req, res) => {
  const { name, email, password } = req.body;
  userModel
    .find({ email, password })
    .then(result => {
      if (result.length > 0) return res
        .status(CLIENT_ERROR.conflict.code)
        .send(CLIENT_ERROR.conflict);

      userModel
        .create({ name, email, password})
        .then(user => res.status(SUCCESS.ok.code).send(user))
        .catch(e => catchHandling(e, res));
    })
    .catch(e => catchHandling(e, res));
};

module.exports = {
  login,
  create
};
