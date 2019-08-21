if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const { initSentry } = require('../src/helpers/sentry');
initSentry();

const serverless = require('serverless-http');
const { app, router } = require('./../src/app.js');

app.use('/.netlify/functions/server', router);

module.exports.app = app;
// module.exports.handler = serverless(app);

const handler = serverless(app);
module.exports.handler = async (event, context, callback) => {
  // you can do other things here
  const result = await handler(event, context, callback);

  const headers = {
    ...result.headers,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };
  
  const newResponse = {
    ...result,
    headers
  };

  return callback(null, newResponse);
};