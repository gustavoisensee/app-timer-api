const userModel = require('../database/models/user');
const catchHandling = require('../helpers/catchHandling');

const {
  SUCCESS,
  CLIENT_ERROR
} = require('../constants/httpStatus');

const getUsers = (req, res) => {
  userModel
    .find()
    .then(users =>
      res.status(SUCCESS.ok.code).send(users))
    .catch(e =>
      catchHandling(e, res)
    );
};

const createUser = (req, res) => {
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
  getUsers,
  createUser
};