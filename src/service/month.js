const mongoose = require('../database');
const monthModel = require('../database/models/month');
const errorHandler = require('../helpers/errorHandler');

const {
  SUCCESS,
} = require('../constants/httpStatus');

const excludedFields = {
  __v: 0
};

const saveMonthsByUserId = async(req, res) => {
  const { userId } = req.params;
  const { data } = req.body;
  const _data = (data && data.map(d => ({ userId, ...d }))) || [];

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // delete old months
    const ids = _data.filter(f => !!f._id).map(m => m._id);
    await monthModel.deleteMany({ _id: { $in: ids } });

    // save new months
    const months = _data.filter(f => !f.deleted);
    const result = await monthModel.insertMany(months);
    await session.commitTransaction();

    res.status(SUCCESS.ok.code).json(result);

  } catch (err) {
    await session.abortTransaction();
    errorHandler(err, res);
  }
};

const getMonthsByUserId = (req, res) => {
  const { userId } = req.params;
  monthModel
    .find({ userId }, excludedFields)
    .then(months => res.status(SUCCESS.ok.code).json(months))
    .catch(err => errorHandler(err, res));
};

module.exports = {
  saveMonthsByUserId,
  getMonthsByUserId
};