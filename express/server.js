const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>Hello from Express.js!</h1>');
});
router.get('*', (req, res) => {
  res.send('<h1>The route does not exist!</h1>');
});

app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);
app.use('/api', router);

module.exports = app;
module.exports.handler = serverless(app);