if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://d17adabdd7354e03b8fffa1488e21a02@sentry.io/1518760' });

const serverless = require('serverless-http');
const { app, router } = require('./../src/app.js');

app.use(function (err, req, res, next) {
  if (err) {
    Sentry.captureMessage('Express initialize error');
    Sentry.captureException(err);
    res.send('Something broke!');
  } else {
    next();
  }
});
router.get('/test', (req, res) => {
  res.send('Express is working!');
});
app.use('/.netlify/functions/server', router);

module.exports.app = app;
module.exports.handler = serverless(app);