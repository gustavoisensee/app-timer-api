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

connection.on('error', (err) => console.warn('Mongo connection error: ', err));
connection.once('open', () => console.warn('Mongo connected'));

module.exports = mongoose;