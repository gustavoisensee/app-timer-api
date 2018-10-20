const auth = require('../service/auth');

const authRoute = (router) => {
	router
		.post('/auth', auth)
    .get('*', (req, res, next) => {
      console.log('--- Check authentication');
      next();
    });
};

module.exports = authRoute;
