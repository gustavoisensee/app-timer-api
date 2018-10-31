const jwt = require('jsonwebtoken');
const catchHandling = require('../helpers/catchHandling');
const userModel = require('../database/models/user');
const {
  SUCCESS,
  CLIENT_ERROR
} = require('../constants/httpStatus');
const { jwt: jwtConfig } = require('../config');
const { sendEmail, getRequestResetPasswordOptions } = require('../helpers/email');

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

const requestResetPassword = (req, res) => {
  const { email } = req.body;
  // TODO: It needs translation #13
  const emailNotFoundMessage = 'Email has been not found.';
  if (email) {
    userModel
      .findOne({ email })
      .then((user) => {
        if (user) {
          const token = jwt.sign(
            { email, userId: user._id },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresToken }
          );
          const options = getRequestResetPasswordOptions(email, token);

          sendEmail(res, options);
        } else {
          res.status(CLIENT_ERROR.badRequest.code)
            .send({ success: false, error: emailNotFoundMessage });
        }
      })
      .catch(e => catchHandling(e, res));
  } else {
    res.status(CLIENT_ERROR.badRequest.code)
      .send({ success: false, error: emailNotFoundMessage });
  }
};

const resetPassword = (req, res) => {
  const { password, token } = req.body;
  // TODO: It needs translation #13
  const messages = {
    INVALID_PASSWORD: 'Password has not been sent.',
    PASSWORD_HAS_SPACES: 'Password must not have spaces.',
    INVALID_TOKEN: 'Token has invalid data.',
    PASSWORD_CHANGED: 'Password has been changed successful.',
    SOMETHING_WRONG: 'Something went wrong, try again.'
  };
  
  if (!token) return res
    .status(CLIENT_ERROR.unauthorized.code)
    .send(CLIENT_ERROR.unauthorized);

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) return res
      .status(CLIENT_ERROR.unauthorized.code)
      .send(CLIENT_ERROR.unauthorized);
    
    const _password = `${password}`;
    if (!_password) return res
      .status(CLIENT_ERROR.badRequest.code)
      .send(messages.INVALID_PASSWORD);
    
    const hasSpaces = _password.indexOf(' ') >= 0;
    if (hasSpaces) return res
      .status(CLIENT_ERROR.badRequest.code)
      .send(messages.PASSWORD_HAS_SPACES);

    const { userId } = decoded;
    if (!userId) return res
      .status(CLIENT_ERROR.badRequest.code)
      .send(messages.INVALID_TOKEN);

    userModel
      .findOneAndUpdate({ _id: userId }, { password })
      .then(user => {
        if (user) return res
          .status(SUCCESS.ok.code)
          .send(messages.PASSWORD_CHANGED);

        res
          .status(CLIENT_ERROR.badRequest.code)
          .send(messages.SOMETHING_WRONG);
      })
      .catch(e => catchHandling(e, res));
  });
};

module.exports = {
  login,
  create,
  requestResetPassword,
  resetPassword
};
