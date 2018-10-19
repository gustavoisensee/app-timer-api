const mongoose = require('../index');  
const userSchema = require('../schemas/user');

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;