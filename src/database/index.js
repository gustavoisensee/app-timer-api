const Sentry = require('@sentry/node');
const mongoose = require('mongoose');
const { db } = require('../config');
const { connection } = mongoose;

mongoose.Promise = Promise;
mongoose.connect(
  db.path,
  {
    dbName: db.name, useNewUrlParser: true
  }
);

connection.on('error', (err) => {
  Sentry.captureMessage('Mongo DB connection error');
  Sentry.captureException(err);
  console.warn('Mongo connection error: ', err);
});
connection.once('open', () => console.warn('Mongo connected'));

module.exports = mongoose;