const account = require('../service/account');

const accountRoute = (router) => {
  router
    .post('/account/login', account.login)
    .post('/account/create', account.create);
};

module.exports = accountRoute;
