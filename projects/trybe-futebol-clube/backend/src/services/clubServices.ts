import ClubModels from '../database/models/ClubModels';
import { IId } from '../interfaces/clubInterfaces';

const getAll = async () => {
  const clubs = await ClubModels.findAll();
  return clubs;
};

const getById = async ({ id }: IId) => {
  const club = await ClubModels.findByPk(id);
  return club;
};

export default { getAll, getById };
