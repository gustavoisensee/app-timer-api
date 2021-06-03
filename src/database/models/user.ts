import mongoose from '../index';
import userSchema from '../schemas/user';
import { UserType } from './types';

export default mongoose.model<UserType>(
  'user',
  userSchema
);
