if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const serverless = require('serverless-http');
const routes = require('../src/routes');
const app = require('../src/app');

app.use('/.netlify/functions/api', routes);

// Export lambda handler
module.exports.handler = serverless(app);