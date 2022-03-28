import { Router } from 'express';
import leaderboardControllers from '../controllers/leaderboardControllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardControllers.leaderboard);
leaderboardRouter.get('/home', leaderboardControllers.filterByHome);
leaderboardRouter.get('/away', leaderboardControllers.filterByAway);

export default leaderboardRouter;
