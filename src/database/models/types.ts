import { Document } from 'mongoose';

export interface UserType extends Document {
  email: string,
  name: string,
  password: string,
  _doc: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
