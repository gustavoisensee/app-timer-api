import mongoose from '../index';

const subItemsSchema = new mongoose.Schema({
  description: String,
  value: Number
});

const itemsSchema = new mongoose.Schema({
  name: String,
  total: Number,
  subItems: [subItemsSchema]
});

export default new mongoose.Schema({
  userId: String,
  year: Number,
  month: String,
  income: Number,
  items: [itemsSchema]
});
