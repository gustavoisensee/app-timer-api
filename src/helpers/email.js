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
  html: `
    <div style="font-family: Arial; font-size: 12px; width: 100%;">
      <h3>App timer - reset password</h3><br />
      <p>We might have lost your App timer password. Sorry for that!</p>
      <p>No worry! You might use the following link to reset your password:</p>
      <a href="${emailConfig.pathResetPassword}?token=${token}" target="_blank">Reset your password</a><br />
      <p>If you don’t use this link within 24 hours, it will expire. To get a new password reset your password again.</p><br />
      <p style="display: grid;">
        <span>Thanks,</span>
        <span>App timer!</span>
      </p>
    </div>
  `
});

module.exports = {
  sendEmail,
  getRequestResetPasswordOptions
};
