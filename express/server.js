require('dotenv').config();

const app = require('./../src/app.js');
const serverless = require('serverless-http');

app.use('/.netlify/functions/server', app.Router());

module.exports = app;
module.exports.handler = serverless(app);