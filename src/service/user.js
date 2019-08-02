const userModel = require('../database/models/user');
const errorHandler = require('../helpers/errorHandler');

const {
  SUCCESS,
  CLIENT_ERROR
} = require('../constants/httpStatus');

const excludedFields = {
  password: 0,
  __v: 0
};

const getUserById = (req, res) => {
  const { id } = req.params;
  userModel
    .findById(id, excludedFields)
    .then(user => res.status(SUCCESS.ok.code).json(user))
    .catch(err => errorHandler(err, res));
};

const getUsers = (req, res) => {
  userModel
    .find(null, excludedFields)
    .then(users => res.status(SUCCESS.ok.code).json(users))
    .catch(err => errorHandler(err, res));
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete(id, excludedFields)
    .then(user => {
      if (user) return res.status(SUCCESS.ok.code)
        .json(SUCCESS.ok);

      return res.status(CLIENT_ERROR.badRequest.code)
        .json(CLIENT_ERROR.badRequest);
    })
    .catch(err => errorHandler(err, res));
};

module.exports = {
  getUserById,
  getUsers,
  deleteUserById
};