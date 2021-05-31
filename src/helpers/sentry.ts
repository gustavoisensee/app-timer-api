import * as Sentry from '@sentry/node';
import config from '../config';

export const initSentry = (): void => {
  Sentry.init({ dsn: config.app.sentryDsn });
};

export const captureMessage = (msg: string): void => {
  Sentry.captureMessage(msg);
};

export const captureException = (err: Error): void => {
  Sentry.captureException(err);
};
