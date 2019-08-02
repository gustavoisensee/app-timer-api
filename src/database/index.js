const mongoose = require('mongoose');
const { captureMessage, captureException } = require('../helpers/sentry');
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
  const msg = 'Mongo DB connection error';
  captureMessage(msg);
  captureException(err);
  console.log(msg);
});

// eslint-disable-next-line
connection.once('open', () => console.log('Mongo connected'));

module.exports = mongoose;