const mongoose = require('../index');

const userSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String
});

module.exports = userSchema;
