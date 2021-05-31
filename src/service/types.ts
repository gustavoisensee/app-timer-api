import { Request, Response } from 'express';

export type RequestResponse = (req: Request, res: Response) => void;
