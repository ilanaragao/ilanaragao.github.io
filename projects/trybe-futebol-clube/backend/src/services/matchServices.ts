import MatchModels from '../database/models/MatchModels';
import ClubModels from '../database/models/ClubModels';

import { IGoals, IMatch } from '../interfaces/matchInterfaces';

const getAll = async () => {
  const matches = await MatchModels.findAll({
    include: [
      {
        model: ClubModels,
        attributes: ['clubName'],
        as: 'homeClub',
      },
      {
        model: ClubModels,
        attributes: ['clubName'],
        as: 'awayClub',
      },
    ],
  });

  return matches;
};

const getAllByParam = async (param: number) => {
  const matches = await MatchModels.findAll({
    where: {
      inProgress: param,
    },
    include: [
      {
        model: ClubModels,
        attributes: ['clubName'],
        as: 'homeClub',
      },
      {
        model: ClubModels,
        attributes: ['clubName'],
        as: 'awayClub',
      },
    ],
  });

  return matches;
};

const create = async ({
  homeTeam,
  awayTeam,
  homeTeamGoals,
  awayTeamGoals,
  inProgress,
}: IMatch) => {
  const match = await MatchModels.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress,
  });

  return match;
};

const update = async (id: number) => {
  await MatchModels.update({ inProgress: false }, { where: { id } });
};

const findClubs = async (homeTeam: number, awayTeam: number) => {
  const clubExists = await ClubModels.findAll({
    where: {
      id: [homeTeam, awayTeam],
    },
  });
  if (!clubExists[0] || !clubExists[1]) return false;
  return true;
};

const updateGoalsAndMatchStatus = async ({
  id,
  homeTeamGoals,
  awayTeamGoals,
}: IGoals) => {
  const match = await MatchModels.update(
    {
      homeTeamGoals,
      awayTeamGoals,
    },
    { where: { id } },
  );

  return match;
};

export default {
  getAll,
  getAllByParam,
  create,
  update,
  findClubs,
  updateGoalsAndMatchStatus,
};
