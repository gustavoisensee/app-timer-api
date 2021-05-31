import { captureException } from './sentry';
import { SERVER_ERROR } from '../constants/httpStatus';
import { Response } from 'express';

const errorHandler = (err: Error, res: Response): void => {
  captureException(err);
  res
    .status(SERVER_ERROR.internalServerError.code)
    .json({
      ...SERVER_ERROR.internalServerError,
      err
    });
};

export default errorHandler;
