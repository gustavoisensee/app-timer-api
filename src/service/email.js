const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const {
  email: emailConfig,
  jwt: jwtConfig
} = require('../config');
const userModel = require('../database/models/user');
const catchHandling = require('../helpers/catchHandling');
const { CLIENT_ERROR, SUCCESS } = require('../constants/httpStatus');

const createTransport = () => nodeMailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,  //true for 465 port, false for other ports
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.password
  }
});

const send = (res, options) => {
  try {
    const transporter = createTransport();
    const mailOptions = {
      from: emailConfig.auth.user,
      ...options
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(CLIENT_ERROR.badRequest.code)
          .send({success: false, error});
      } else {
        res.status(SUCCESS.ok.code)
          .send({success: true});
      }
    });

  } catch (error) {
    res.status(CLIENT_ERROR.badRequest.code)
      .send({success: false, error}); 
  }
};

const getRequestForgetPasswordOptions = (email, token) => ({
  to: email,
  // TODO: It needs translation #13
  subject: 'App timer - Reset password',
  // TODO: It needs Html creation #14
  html: `
    <div>
      <b>
        This is the link to reset your password
      </b>
      <br />
      <a href="${emailConfig.pathResetPassword}?token=${token}"
        target="_blank">Reset your password</a>
    </div>
  `
});

const sendRequestForgetPassword = (req, res) => {
  const { email } = req.body;
  // TODO: It needs translation #13
  const emailNotFoundMessage = 'Email has been not found.';
  if (email) {
    userModel
      .findOne({ email })
      .then((user) => {
        if (user) {
          const token = jwt.sign(
            { email },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresToken }
          );
          const options = getRequestForgetPasswordOptions(email, token);

          send(res, options);
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

module.exports = { sendRequestForgetPassword };
