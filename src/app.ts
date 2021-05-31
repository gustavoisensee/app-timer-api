import express from 'express';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import compression from 'compression';
import cors from 'cors';
import corsOptions from './helpers/cors';
import { captureException } from './helpers/sentry';
import routes from './routes/index';

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(Sentry.Handlers.requestHandler());
app.use(routes);
app.use(Sentry.Handlers.errorHandler());

const initApp = (): void => {
  const port = process.env.PORT || 4000;

  app
    .listen(port, () => {
      // eslint-disable-next-line
      console.log(`Listening at http://localhost:${port}`);
    })
    .on('error', captureException);
};

export default initApp;
