import mongoose from '../index';

export default new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profile: Number
});
