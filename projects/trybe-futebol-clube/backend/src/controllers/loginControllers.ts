import { Request, Response } from 'express';
import loginServices from '../services/loginServices';

import verifyToken from '../token/verifyToken';
import statusCodes from '../enums/statusCodes';
import { ILogin } from '../interfaces/loginInterfaces';

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: ILogin = req.body;
  const user = await loginServices.login({ email, password });
  res.status(statusCodes.OK).json(user);
};

const validate = async (req: Request, res: Response): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('Authorization header is required');
  }

  const { role } = await verifyToken(authorization);
  res.status(statusCodes.OK).json(role);
};

export default { login, validate };
