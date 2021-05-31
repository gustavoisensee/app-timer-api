import { Router } from 'express';
import { saveMonthsByUserId, getMonthsByUserId } from '../service/month';

const init = (router: Router): void => {
  router
    .post('/month/user/:userId', saveMonthsByUserId)
    .get('/month/user/:userId', getMonthsByUserId);
};

export default init;
