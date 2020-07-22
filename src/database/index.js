const mongoose = require('mongoose');
const { db } = require('../config');
const { captureMessage, captureException } = require('../helpers/sentry');
const { connection } = mongoose;

mongoose.Promise = Promise;
mongoose.connect(
  db.path,
  {
    dbName: db.name,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

connection.on('error', (err) => {
  captureMessage('Mongo DB connection error');
  captureException(err);
});

// eslint-disable-next-line
connection.once('open', () => console.log('Mongo connected'));

module.exports = mongoose;