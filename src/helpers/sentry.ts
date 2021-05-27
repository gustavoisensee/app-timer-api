import * as Sentry from '@sentry/node';

export const initSentry = () => {
  Sentry.init({
    dsn: 'https://d17adabdd7354e03b8fffa1488e21a02@o285605.ingest.sentry.io/1518760'
  });
};

export const captureMessage = (msg: string) => Sentry.captureMessage(msg);

export const captureException = (err: Error) => Sentry.captureException(err);
