const jwt = require('jsonwebtoken');
const catchHandling = require('../helpers/catchHandling');
const userModel = require('../database/models/user');
const {
  SUCCESS,
  CLIENT_ERROR
} = require('../constants/httpStatus');
const { jwt: jwtConfig } = require('../config');

const login = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email, password })
    .then(user => {
      if (!user) return res.status(CLIENT_ERROR.badRequest.code)
        .send(CLIENT_ERROR.badRequest);
      
      const token = jwt.sign(
        { email, password },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresToken }
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

const resetPassword = (req, res) => {
  const { password, token } = req.body;
  // TODO: It needs translation #13
  
  if (!token) return res
    .status(CLIENT_ERROR.unauthorized.code)
    .send(CLIENT_ERROR.unauthorized);

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) return res
      .status(CLIENT_ERROR.unauthorized.code)
      .send(CLIENT_ERROR.unauthorized);
    
    const passwordTrim = `${password}`;
    if (!passwordTrim) return res.status(400).send('Password has not been sent.');
    
    const hasSpaces = passwordTrim.indexOf(' ') >= 0;
    if (!hasSpaces) return res.status(400).send('Password must not have spaces.');

    const { userId } = decoded;
    if (!userId) return res.status(400).send('Token has invalid data.');

    userModel
      .findOneAndUpdate({ _id: userId }, { password })
      .then(user => {
        if (user) return res.status(200).send('Password has been changed successful.');
        res.status(400).send('Something went wrong, try again.');
      })
      .catch(e => catchHandling(e, res));
  });
};

module.exports = {
  login,
  create,
  resetPassword
};
