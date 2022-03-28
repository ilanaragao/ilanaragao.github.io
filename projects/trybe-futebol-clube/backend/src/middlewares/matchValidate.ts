import { Request, Response, NextFunction } from 'express';
import matchServices from '../services/matchServices';

import statusCodes from '../enums/statusCodes';

const clubsValidate = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(statusCodes.UNAUTHORIZED).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  next();
};

const findClubs = async (req: Request, res: Response, next: NextFunction) => {
  const { awayTeam, homeTeam } = req.body;
  const result = await matchServices.findClubs(homeTeam, awayTeam);

  if (!result) {
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: 'There is no team with such id!' });
  }

  next();
};

export default { clubsValidate, findClubs };
