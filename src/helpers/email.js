const nodeMailer = require('nodemailer');
const {
  email: emailConfig,
} = require('../config');
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

const sendEmail = (res, options) => {
  try {
    const transporter = createTransport();
    const mailOptions = {
      from: emailConfig.auth.user,
      ...options
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(CLIENT_ERROR.badRequest.code)
          .json({success: false, error});
      } else {
        res.status(SUCCESS.ok.code)
          .json({success: true});
      }
    });

  } catch (error) {
    res.status(CLIENT_ERROR.badRequest.code)
      .json({success: false, error}); 
  }
};

const getRequestResetPasswordOptions = (email, token) => ({
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

module.exports = {
  sendEmail,
  getRequestResetPasswordOptions
};
