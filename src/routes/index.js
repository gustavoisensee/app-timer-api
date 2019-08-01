const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is fine!');
});
// Routes without authorization
// require('./account')(router);

// Set up a verify bearer token
// require('./verifyValidToken')(router);

// Routes with authorization
// require('./user')(router);
// require('./month')(router);

module.exports = router;