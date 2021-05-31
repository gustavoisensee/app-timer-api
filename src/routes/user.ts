import { Router } from 'express';
import {
  getUserById,
  getUsers,
  deleteUserById
} from '../service/user';

const init = (router: Router): void => {
  router
    .get('/user/:id', getUserById)
    .get('/user', getUsers)
    .delete('/user/:id', deleteUserById);
};

export default init;
