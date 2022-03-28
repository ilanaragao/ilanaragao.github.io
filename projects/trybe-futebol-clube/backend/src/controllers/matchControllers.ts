import { Request, Response } from 'express';
import matchServices from '../services/matchServices';

import statusCodes from '../enums/statusCodes';

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress) {
    const param = inProgress === 'false' ? 0 : 1;
    const matchs = await matchServices.getAllByParam(param);
    return res.status(statusCodes.OK).json(matchs);
  }

  const matchs = await matchServices.getAll();
  return res.status(statusCodes.OK).json(matchs);
};

const create = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } =
    req.body;
  const match = await matchServices.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress,
  });
  return res.status(statusCodes.CREATED).json(match);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchServices.update(+id);
  return res.status(statusCodes.OK).json({ message: 'Match updated' });
};

const updateGoalsAndMatchStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await matchServices.updateGoalsAndMatchStatus({
    id,
    homeTeamGoals,
    awayTeamGoals,
  });
  return res
    .status(statusCodes.OK)
    .json({ message: 'Match and goals updated' });
};

export default { getAll, create, update, updateGoalsAndMatchStatus };
