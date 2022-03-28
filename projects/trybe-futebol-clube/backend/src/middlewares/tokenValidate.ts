import { NextFunction, Request, Response } from 'express';
import verifyToken from '../token/verifyToken';

const tokenValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  await verifyToken(authorization as string);

  next();
};

export default { tokenValidation };
