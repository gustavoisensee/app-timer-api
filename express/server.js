require('dotenv').config();
const Sentry = require('@sentry/node');
const serverless = require('serverless-http');
const { app, router } = require('./../src/app.js');

Sentry.init({ dsn: 'https://d17adabdd7354e03b8fffa1488e21a02@sentry.io/1518760' });

app.use('/.netlify/functions/server', router);

module.exports.app = app;
module.exports.handler = serverless(app);