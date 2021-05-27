import * as Sentry from '@sentry/node';
import app from './app';
import routes from './routes/index';
import { initSentry, captureException } from './helpers/sentry';

initSentry();

app.use(Sentry.Handlers.requestHandler());
app.use(routes);
app.use(Sentry.Handlers.errorHandler());

try {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  }).on('error', captureException);

} catch (err) {
  captureException(err);
}

