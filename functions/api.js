if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const serverless = require('serverless-http');
const app = require('../src/app');

// Export lambda handler
module.exports.handler = serverless(app);