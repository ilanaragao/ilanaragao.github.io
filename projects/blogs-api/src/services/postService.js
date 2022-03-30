const { BlogPost, User, Category } = require('../models');

const create = async ({ title, content, categoryIds, email }) => {
  const getUser = await User.findOne({ where: { email } });
  const post = await BlogPost.create({
    title,
    content,
    categoryIds,
    userId: getUser.id,
  });

  return post;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  return post;
};

module.exports = {
  create,
  getAll,
  getById,
};
