const { User } = require('../models');

const create = async ({ displayName, password, email, image }) => {
  const user = await User.create({
    displayName,
    password,
    email,
    image,
  });

  return user.dataValues;
};

const findByEmail = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getById = async ({ id }) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = {
  create,
  findByEmail,
  getAll,
  getById,
};
