require('dotenv').config();

const { app, router } = require('./../src/app.js');
const serverless = require('serverless-http');

app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);