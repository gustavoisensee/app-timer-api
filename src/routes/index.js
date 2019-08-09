const express = require('express');
const router = express.Router();

// Generic router to check the API status
router.get('/status', (req, res) => {
  res.send('API is running!');
});

// Routes without authorization
require('./account')(router);

// Set up a verify bearer token
require('./verifyValidToken')(router);

// Routes with authorization
require('./user')(router);
require('./month')(router);

module.exports = router;