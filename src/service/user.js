const userModel = require('../database/models/user');
const catchHandling = require('../helpers/catchHandling');

const {
  SUCCESS,
} = require('../constants/httpStatus');

const getUserById = (req, res) => {
  const { id } = req.params;
  userModel
    .findById(id)
    .then(user =>
      res.status(SUCCESS.ok.code).send(user))
    .catch(e =>
      catchHandling(e, res)
    );
};

const getUsers = (req, res) => {
  userModel
    .find()
    .then(users =>
      res.status(SUCCESS.ok.code).send(users))
    .catch(e =>
      catchHandling(e, res)
    );
};

module.exports = {
  getUserById,
  getUsers
};