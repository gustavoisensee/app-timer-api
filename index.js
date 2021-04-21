if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;
const app = require('./src/app');
const routes = require('./src/routes');
const { initSentry, Sentry, captureException } = require('./src/helpers/sentry');

initSentry();

app.use(Sentry.Handlers.requestHandler());
app.use(routes);
app.use(Sentry.Handlers.requestHandler());

try {
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Listening at http://localhost:${port}`);
  }).on('error', captureException);
} catch (err) {
  captureException(err);
}

