const mocks = {
  mockUser: {
    id: 1,
    username: 'User',
    role: 'user',
    email: 'user@user.com.br',
    password: '123456',
  },

  mockClubs: [
    {
      id: 1,
      clubName: 'Avaí/Kindermann',
    },
    {
      id: 2,
      clubName: 'Bahia',
    },
    {
      id: 3,
      clubName: 'Botafogo',
    },
  ],

  mockMatchs: [
    {
      id: 1,
      homeTeam: 1,
      homeTeamGoals: 2,
      awayTeam: 3,
      awayTeamGoals: 4,
      inProgress: 1,
    },
    {
      id: 2,
      homeTeam: 2,
      homeTeamGoals: 3,
      awayTeam: 4,
      awayTeamGoals: 5,
      inProgress: 0,
    },
  ],

  mockLeaderboard: [
    {
      name: 'Santos',
      totalPoints: 12,
      totalGames: 4,
      totalVictories: 4,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 10,
      goalsOwn: 2,
      goalsBalance: 8,
      efficiency: 100,
    },
    {
      name: 'Corinthians',
      totalPoints: 4,
      totalGames: 2,
      totalVictories: 1,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 6,
      goalsOwn: 1,
      goalsBalance: 5,
      efficiency: 100,
    },
    {
      name: 'São Paulo',
      totalPoints: 0,
      totalGames: 2,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 2,
      goalsFavor: 0,
      goalsOwn: 5,
      goalsBalance: -5,
      efficiency: 0,
    },
  ],
};

export default mocks;
