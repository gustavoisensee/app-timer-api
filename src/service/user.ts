import { Request, Response } from 'express';
import { QueryOptions } from 'mongoose';
import userModel from '../database/models/user';
import errorHandler from '../helpers/errorHandler';
import { SUCCESS, CLIENT_ERROR } from '../constants/httpStatus';

const excludedFields = <QueryOptions> {
  password: 0,
  __v: 0
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  userModel
    .findById(id, excludedFields)
    .then(user => res.status(SUCCESS.ok.code).json(user))
    .catch(err => errorHandler(err, res));
};

export const getUsers = (req: Request, res: Response) => {
  userModel
    .find(null, excludedFields)
    .then(users => res.status(SUCCESS.ok.code).json(users))
    .catch(err => errorHandler(err, res));
};

export const deleteUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete(id, excludedFields)
    .then(user => {
      if (user) return res.status(SUCCESS.ok.code)
        .json(SUCCESS.ok);

      return res.status(CLIENT_ERROR.badRequest.code)
        .json(CLIENT_ERROR.badRequest);
    })
    .catch(err => errorHandler(err, res));
};
