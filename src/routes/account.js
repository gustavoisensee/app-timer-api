const account = require('../service/account');

const accountRoute = (router) => {
  router
    .post('/account/login', account.login)
    .post('/account/create', account.create)
    .post('/account/request-reset-password', account.requestResetPassword)
    .post('/account/reset-password', account.resetPassword);
};

module.exports = accountRoute;
