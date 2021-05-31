import { Router } from 'express';
import {
  login,
  create,
  requestResetPassword,
  resetPassword
} from '../service/account';

const init = (router: Router): void => {
  router
    .post('/account/login', login)
    .post('/account/create', create)
    .post('/account/request-reset-password', requestResetPassword)
    .post('/account/reset-password', resetPassword);
};

export default init;
