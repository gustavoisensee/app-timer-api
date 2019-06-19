const monthModel = require('../database/models/month');
const catchHandling = require('../helpers/catchHandling');

const {
  SUCCESS,
} = require('../constants/httpStatus');

const getMonthsByUserId = (req, res) => {
  const { userId } = req.params;
  monthModel
    .find({ userId })
    .then(months =>
      res.status(SUCCESS.ok.code).json(months))
    .catch(e =>
      catchHandling(e, res)
    );
};

module.exports = {
  getMonthsByUserId
};