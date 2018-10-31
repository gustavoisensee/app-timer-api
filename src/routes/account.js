const account = require('../service/account');
const email = require('../service/email');

const accountRoute = (router) => {
  router
    .post('/account/login', account.login)
    .post('/account/create', account.create)
    .post('/account/request-reset-password', email.sendRequestForgetPassword)
    .post('/account/reset-password', account.resetPassword);
};

module.exports = accountRoute;
