import { NextFunction, Request, Response } from 'express';

import statusCodes from '../enums/statusCodes';

const emailValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email) {
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: 'All fields must be filled' });
  }

  if (!regex.test(email)) {
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }

  next();
};

const passwordValidate = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: 'All fields must be filled' });
  }

  if (password.length <= 6) {
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }

  next();
};

export default { emailValidate, passwordValidate };
