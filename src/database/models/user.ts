import { Document } from 'mongoose';
import mongoose from '../index';
import userSchema from '../schemas/user';

interface User extends Document {
  email: string,
  name: string,
  password: string,
  _doc: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default mongoose.model<User>(
  'user',
  userSchema
);
