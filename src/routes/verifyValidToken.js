const verifyValidToken = (router) => {
  router
    .get('*', (req, res, next) => {
      console.log('--- Check authentication');
      next();
    });
};

module.exports = verifyValidToken;
