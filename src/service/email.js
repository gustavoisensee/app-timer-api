const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const {
  email: emailConfig,
  jwt: jwtConfig
} = require('../config');
const userModel = require('../database/models/user');
const catchHandling = require('../helpers/catchHandling');

const send = (res, options) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,  //true for 465 port, false for other ports
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.password
      }
    });

    const mailOptions = {
      from: emailConfig.auth.user,
      ...options
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(400).send({success: false, error});
      } else {
        res.status(200).send({success: true});
      }
    });

  } catch (error) {
    res.status(400).send({success: false, error}); 
  }
};

const getRequestForgetPasswordOptions = (email, token) => ({
  to: email,
  subject: 'App timer - Reset password',
  // text: 'Hello world?', // plain text body
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
  if (email) {
    userModel
      .findOne({ email })
      .then(() => {
        const token = jwt.sign(
          { email },
          jwtConfig.secret,
          { expiresIn: jwtConfig.expiresToken }
        );

        const options = getRequestForgetPasswordOptions(email, token);
        send(res, options);
      })
      .catch(e =>
        catchHandling(e, res)
      );
  } else {
    res.status(400).send({ success: false, error: 'Email is required' });
  }
};

module.exports = { sendRequestForgetPassword };
