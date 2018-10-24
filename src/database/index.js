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

connection.on('error', (err) => console.log('connection error: ', err));
connection.once('open', () => console.log('connected'));

module.exports = mongoose;