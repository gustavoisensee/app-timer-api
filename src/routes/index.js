const express = require('express');
const router = express.Router();

// Routes without authorisation
require('./account')(router);

// Set up a verify bearer token
require('./verifyValidToken')(router);

// Routes with authorisation
require('./user')(router);

module.exports = router;