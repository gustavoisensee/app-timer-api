const service = require('../service/month');

const monthRoute = (router) => {
  router
    .post('/month/user/:userId', service.createMonthsByUserId)
    .get('/month/user/:userId', service.getMonthsByUserId);
};

module.exports = monthRoute;