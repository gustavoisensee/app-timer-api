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

connection.on('error', (err) => console.log('Mongo connection error: ', err));
connection.once('open', () => console.log('Mongo connected'));

module.exports = mongoose;