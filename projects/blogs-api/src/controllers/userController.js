const userService = require('../services/userService');

const { tokenGenerate } = require('../middlewares/auth');
const { CONFLICT, CREATED, OK, NOT_FOUND } = require('../utils/statusCode');
const { REGISTERED, USER_NOT_EXIST } = require('../utils/messageError');

const create = async (req, res) => {
  const { displayName, password, email, image } = req.body;
  const emailExist = await userService.findByEmail({ email });

  if (emailExist) {
    return res.status(CONFLICT).json(REGISTERED);
  }

  const user = await userService.create({
    displayName,
    password,
    email,
    image,
  });

  const token = tokenGenerate(user);
  return res.status(CREATED).json({ token });
};

const getAll = async (req, res) => {
  const users = await userService.getAll();
  return res.status(OK).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById({ id });

  if (!user) {
    return res.status(NOT_FOUND).json(USER_NOT_EXIST);
  }

  return res.status(OK).json(user);
};

module.exports = {
  create,
  getAll,
  getById,
};
