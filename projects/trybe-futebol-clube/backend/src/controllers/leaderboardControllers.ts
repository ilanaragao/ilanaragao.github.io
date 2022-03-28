import { Request, Response } from 'express';
import leaderboardServices from '../services/leaderboardServices';

import statusCodes from '../enums/statusCodes';

const filterByHome = async (req: Request, res: Response): Promise<void> => {
  const filter = await leaderboardServices.filterByHome();
  res.status(statusCodes.OK).json(filter);
};

const filterByAway = async (req: Request, res: Response): Promise<void> => {
  const filter = await leaderboardServices.filterByAway();
  res.status(statusCodes.OK).json(filter);
};

const leaderboard = async (req: Request, res: Response): Promise<void> => {
  const leaderboard = await leaderboardServices.leaderboard();
  res.status(statusCodes.OK).json(leaderboard);
};

export default { filterByHome, filterByAway, leaderboard };
