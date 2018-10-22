const {
  SERVER_ERROR
} = require('../constants/httpStatus');

const catchNotify = (error, res) => {
  res
    .status(SERVER_ERROR.internalServerError.code)
    .send({
      ...SERVER_ERROR.internalServerError,
      error
    });
};

module.exports = catchNotify;
