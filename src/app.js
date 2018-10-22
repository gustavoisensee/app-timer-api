const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(router);

module.exports = app;