const service = require('../service/month');

const monthRoute = (router) => {
  router
    .get('/month/user/:userId', service.getMonthsByUserId);
};

module.exports = monthRoute;