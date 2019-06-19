const mongoose = require('../index');

const subItemsSchema = new mongoose.Schema({  
  description: String,
  value: Number
});

const itemsSchema = new mongoose.Schema({  
  name: String,
  total: Number,
  subItems: [subItemsSchema]
});

const monthSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  year: Number,
  month: String,
  income: Number,
  items: [itemsSchema]
});

module.exports = monthSchema;
