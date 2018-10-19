const express = require('express');
const router = express.Router();

require('./auth')(router);
require('./user')(router);

// Add all routes

module.exports = router;