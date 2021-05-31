import mongoose from 'mongoose';
import config from '../config';
import { captureMessage, captureException } from '../helpers/sentry';

const { connection } = mongoose;

mongoose.Promise = Promise;
mongoose.connect(
  config.db.path,
  {
    dbName: config.db.name,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

connection.on('error', (err) => {
  captureMessage('Mongo DB connection error');
  captureException(err);
});

connection.once('open', () => {
  // eslint-disable-next-line
  console.log('Mongo connected');
});

export default mongoose;
