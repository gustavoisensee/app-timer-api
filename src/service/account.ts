import jwt from 'jsonwebtoken';
import errorHandler from '../helpers/errorHandler';
import userModel from '../database/models/user';
import { SUCCESS, CLIENT_ERROR } from '../constants/httpStatus';
import config from '../config';
import { sendEmail, getRequestResetPasswordOptions } from '../helpers/email';
import { encrypt, compare } from '../helpers/encryption';
import profile from '../constants/profile';

export const login = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    userModel
      .findOne({ email })
      .then(user => {
        if (!user) return res.status(CLIENT_ERROR.badRequest.code)
          .json(CLIENT_ERROR.badRequest);
        
        const isValid = compare(password, user.password);
        if (!isValid) return res.status(CLIENT_ERROR.badRequest.code)
          .json(CLIENT_ERROR.badRequest);

        const _user = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        const token = jwt.sign(
          _user,
          config.jwt.secret,
          { expiresIn: config.jwt.expiresToken }
        );
        res.status(SUCCESS.ok.code).json({ user: _user, token });
      })
      .catch(err => errorHandler(err, res));
  } else {
    res.status(CLIENT_ERROR.badRequest.code)
      .json(CLIENT_ERROR.badRequest);
  }
};

export const create = (req, res) => {
  const { name, email, password: _password } = req.body;
  userModel
    .find({ email })
    .then(result => {
      if (result.length > 0) return res
        .status(CLIENT_ERROR.conflict.code)
        .json(CLIENT_ERROR.conflict);
      
      const password = encrypt(_password);
      userModel
        .create({
          name,
          email,
          password,
          profile: profile.USER
        })
        .then((result) => {
          // remove encrypted password
          const _user = { ...result };
          // eslint-disable-next-line
          const { password, __v, ...user } = _user._doc;
          res.status(SUCCESS.ok.code).json(user);
        })
        .catch(err => errorHandler(err, res));
    })
    .catch(err => errorHandler(err, res));
};

export const requestResetPassword = (req, res) => {
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
            config.jwt.secret,
            { expiresIn: config.jwt.expiresToken }
          );
          const options = getRequestResetPasswordOptions(email, token);

          sendEmail(res, options);
        } else {
          res.status(CLIENT_ERROR.badRequest.code)
            .json({ success: false, error: emailNotFoundMessage });
        }
      })
      .catch(err => errorHandler(err, res));
  } else {
    res.status(CLIENT_ERROR.badRequest.code)
      .json({ success: false, error: emailNotFoundMessage });
  }
};

export const resetPassword = (req, res) => {
  const { password: _password, token } = req.body;
  // TODO: It needs translation #13
  const messages = {
    INVALID_PASSWORD: { message: 'Password has not been sent.' },
    PASSWORD_HAS_SPACES: { message: 'Password must not have spaces.' },
    INVALID_TOKEN: { message: 'Token has invalid data.' },
    PASSWORD_CHANGED: { message: 'Password has been changed successful.' },
    SOMETHING_WRONG: { message: 'Something went wrong, try again.' }
  };
  
  if (!token) return res
    .status(CLIENT_ERROR.unauthorized.code)
    .json(CLIENT_ERROR.unauthorized);

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) return res
      .status(CLIENT_ERROR.unauthorized.code)
      .json(CLIENT_ERROR.unauthorized);
    
    if (!_password) return res
      .status(CLIENT_ERROR.badRequest.code)
      .json(messages.INVALID_PASSWORD);
    
    const hasSpaces = _password.indexOf(' ') >= 0;
    if (hasSpaces) return res
      .status(CLIENT_ERROR.badRequest.code)
      .json(messages.PASSWORD_HAS_SPACES);

    const { userId } = decoded;
    if (!userId) return res
      .status(CLIENT_ERROR.badRequest.code)
      .json(messages.INVALID_TOKEN);

    const password = encrypt(_password);
    userModel
      .findOneAndUpdate({ _id: userId }, { password })
      .then(user => {
        if (user) return res
          .status(SUCCESS.ok.code)
          .json(messages.PASSWORD_CHANGED);

        res
          .status(CLIENT_ERROR.badRequest.code)
          .json(messages.SOMETHING_WRONG);
      })
      .catch(err => errorHandler(err, res));
  });
};
