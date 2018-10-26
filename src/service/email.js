const nodeMailer = require('nodemailer');
const { email: configEmail } = require('../config');
const userModel = require('../database/models/user');
const catchHandling = require('../helpers/catchHandling');

const send = (res, options) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: configEmail.host,
      port: configEmail.port,
      secure: configEmail.secure,  //true for 465 port, false for other ports
      auth: {
        user: configEmail.auth.user,
        pass: configEmail.auth.password
      }
    });

    const mailOptions = {
      from: configEmail.auth.user,
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

const getRequestForgetPasswordOptions = (email) => ({
  to: email,
  subject: 'App timer - Reset password',
  // text: 'Hello world?', // plain text body
  html: `
    <div>
      <b>
        This is the link to reset your password
      </b>
      <a href="http://localhost:3000/">Reset your password</a>
    </div>
  `
});

const sendRequestForgetPassword = (req, res) => {
  const { email } = req.body;
  if (email) {
    userModel
      .findOne({ email })
      .then(() => {
        const options = getRequestForgetPasswordOptions(email);
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
