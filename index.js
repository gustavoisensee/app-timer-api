const Sentry = require('@sentry/node');
const { app } = require('./express/server');
const { app: appConfig } = require('./src/config');

Sentry.init({ dsn: 'https://d17adabdd7354e03b8fffa1488e21a02@sentry.io/1518760' });

app.listen(appConfig.port, () =>
  console.warn(`App running on port ${appConfig.port}!`));