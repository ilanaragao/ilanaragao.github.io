import { Request, Response } from 'express';
import clubServices from '../services/clubServices';

import statusCodes from '../enums/statusCodes';

const getAll = async (req: Request, res: Response): Promise<void> => {
  const clubs = await clubServices.getAll();
  res.status(statusCodes.OK).json(clubs);
};

const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const club = await clubServices.getById({ id });
  res.status(statusCodes.OK).json(club);
};

export default { getAll, getById };
