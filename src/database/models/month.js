const mongoose = require('../index');  
const monthSchema = require('../schemas/month');

const monthModel = mongoose.model('month', monthSchema);

module.exports = monthModel;
