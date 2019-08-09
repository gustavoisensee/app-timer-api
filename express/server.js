if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const { initSentry } = require('../src/helpers/sentry');
initSentry();

const serverless = require('serverless-http');
const { app, router } = require('./../src/app.js');

app.use('/.netlify/functions/server', router);

module.exports.app = app;
module.exports.handler = serverless(app);