import mongoose from '../index';
import monthSchema from '../schemas/month';

export default mongoose.model(
  'month',
  monthSchema
);
