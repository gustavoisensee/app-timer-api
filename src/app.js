const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors({
  // origin: [
  //   'https://my-finances-web.netlify.com',
  //   'http://localhost:3000'
  // ]
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/.netlify/functions/api', router);

module.exports = app;