const monthModel = require('../database/models/month');
const catchHandling = require('../helpers/catchHandling');

const {
  SUCCESS,
} = require('../constants/httpStatus');

const excludedFields = {
  __v: 0
};

const createMonthsByUserId = (req, res) => {
  const { userId } = req.params;
  const { data } = req.body;
  const _data = data && data.map(d => ({ userId, ...d }));
    
  monthModel
    .insertMany(_data)
    .then((result) => {
      res.status(SUCCESS.ok.code).json(result);
    })
    .catch(e => catchHandling(e, res));
};

const getMonthsByUserId = (req, res) => {
  const { userId } = req.params;
  monthModel
    .find({ userId }, excludedFields)
    .then(months =>
      res.status(SUCCESS.ok.code).json(months))
    .catch(e =>
      catchHandling(e, res)
    );
};

module.exports = {
  createMonthsByUserId,
  getMonthsByUserId
};