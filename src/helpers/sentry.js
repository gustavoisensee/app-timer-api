const Sentry = require('@sentry/node');

const init = () => {
  Sentry.init({ dsn: 'https://d17adabdd7354e03b8fffa1488e21a02@sentry.io/1518760' });
};

const captureMessage = (msg) => Sentry.captureMessage(msg);

const captureException = (err) => Sentry.captureException(err);

module.exports.initSentry = init;
module.exports.captureMessage = captureMessage;
module.exports.captureException = captureException;
