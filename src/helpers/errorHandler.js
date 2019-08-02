const { captureException } = require('./sentry');
const {
  SERVER_ERROR
} = require('../constants/httpStatus');

const errorHandler = (err, res) => {
  captureException(err);
  res
    .status(SERVER_ERROR.internalServerError.code)
    .json({
      ...SERVER_ERROR.internalServerError,
      err
    });
};

module.exports = errorHandler;
