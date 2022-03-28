import { Router } from 'express';
import clubControllers from '../controllers/clubControllers';

const clubRouter = Router();

clubRouter.get('/', clubControllers.getAll);
clubRouter.get('/:id', clubControllers.getById);

export default clubRouter;
