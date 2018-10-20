const service = require('../service/user');

const userRoute = (router) => {
  router
    .get('/user', service.getUsers)
    .post('/user', service.createUser)
};

module.exports = userRoute;