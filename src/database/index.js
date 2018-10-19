const mongoose = require('mongoose');
const { connection } = mongoose;

mongoose.Promise = Promise;
mongoose.connect(
  'mongodb+srv://admin:admin123@app-timer-api-aaipk.mongodb.net',
  { dbName: 'app-timer-db', useNewUrlParser: true }
);

connection.on('error', (err) => console.log('connection error: ', err));
connection.once('open', () => console.log('connected'));

module.exports = mongoose;