const service = require('../service/month');

const monthRoute = (router) => {
  router
    .post('/month/user/:userId', service.saveMonthsByUserId)
    .get('/month/user/:userId', service.getMonthsByUserId);
};

module.exports = monthRoute;