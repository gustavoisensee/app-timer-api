const service = require('../service/user');

const userRoute = (router) => {
  router
    .get('/user/:id', service.getUserById)
    .get('/user', service.getUsers)
    .delete('/user/:id', service.deleteUserById);
};

module.exports = userRoute;