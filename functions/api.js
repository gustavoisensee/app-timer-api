if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const serverless = require('serverless-http');
const app = require('../src/app');
const routes = require('../src/routes');

app.use('/.netlify/functions/api', routes);

// Export lambda handler
module.exports.handler = serverless(app);