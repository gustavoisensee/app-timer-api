const mongoose = require('../index');

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  profile: Number
});

module.exports = userSchema;
