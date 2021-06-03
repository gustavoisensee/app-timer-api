import { Request, Response } from 'express';

export type RequestResponse = (req: Request, res: Response) => void;

type Data = {
  _id: string,
  deleted: boolean
};

export type BodyData = {
  data: Array<Data>
};

export type BodyLogin = {
  email: string,
  password: string
};

export interface BodyCreateUser extends BodyLogin {
  name: string
}

export type BodyRequestResetPassword = {
  email: string
};

export type BodyResetPassword = {
  password: string,
  token: string
};
