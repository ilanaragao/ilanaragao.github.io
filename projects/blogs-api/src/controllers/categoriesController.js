const categoriesService = require('../services/categoriesService');
const { CREATED, OK } = require('../utils/statusCode');

const create = async (req, res) => {
  const { name } = req.body;
  const caterogy = await categoriesService.create({ name });
  return res.status(CREATED).json(caterogy);
};

const getAll = async (req, res) => {
  const categories = await categoriesService.getAll();
  return res.status(OK).json(categories);
};

module.exports = {
  create,
  getAll,
};
