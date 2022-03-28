import { Router } from 'express';
import matchValidate from '../middlewares/matchValidate';
import matchControllers from '../controllers/matchControllers';
import tokenValidate from '../middlewares/tokenValidate';

const matchRouter = Router();

matchRouter.get('/', matchControllers.getAll);
matchRouter.post(
  '/',
  tokenValidate.tokenValidation,
  matchValidate.clubsValidate,
  matchValidate.findClubs,
  matchControllers.create,
);
matchRouter.patch('/:id', matchControllers.updateGoalsAndMatchStatus);
matchRouter.patch('/:id/finish', matchControllers.update);

export default matchRouter;
