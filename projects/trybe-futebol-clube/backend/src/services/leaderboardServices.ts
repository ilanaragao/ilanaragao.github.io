import clubServices from './clubServices';
import matchServices from './matchServices';

import {
  arrayClubs,
  drawHome,
  drawAway,
  winHome,
  winAway,
  lossHome,
  lossAway,
  classification,
} from '../utils/filterLeaderboard';

const filterByHome = async () => {
  const matchs = await matchServices.getAll();
  const clubs = await clubServices.getAll();

  const leaderboard = arrayClubs(clubs);

  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.homeTeamGoals - match.awayTeamGoals;

      if (result === 0) return drawHome(match, leaderboard);
      if (result < 0) return lossHome(match, leaderboard);
      return winHome(match, leaderboard);
    }
  });

  return classification(leaderboard);
};

const filterByAway = async () => {
  const matchs = await matchServices.getAll();
  const clubs = await clubServices.getAll();

  const leaderboard = arrayClubs(clubs);

  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.awayTeamGoals - match.homeTeamGoals;

      if (result === 0) return drawAway(match, leaderboard);
      if (result < 0) return lossAway(match, leaderboard);
      return winAway(match, leaderboard);
    }
  });

  return classification(leaderboard);
};

const leaderboard = async () => {
  const matchs = await matchServices.getAll();
  const clubs = await clubServices.getAll();

  const leaderboard = arrayClubs(clubs);

  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.homeTeamGoals - match.awayTeamGoals;

      if (result === 0) return drawHome(match, leaderboard);
      if (result < 0) return lossHome(match, leaderboard);
      return winHome(match, leaderboard);
    }
  });

  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.awayTeamGoals - match.homeTeamGoals;

      if (result === 0) return drawAway(match, leaderboard);
      if (result < 0) return lossAway(match, leaderboard);
      return winAway(match, leaderboard);
    }
  });

  return classification(leaderboard);
};

export default { filterByHome, filterByAway, leaderboard };
