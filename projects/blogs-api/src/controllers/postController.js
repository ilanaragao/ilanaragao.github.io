const postService = require('../services/postService');

const { CREATED, OK, NOT_FOUND } = require('../utils/statusCode');
const { POST_NOT_EXIST } = require('../utils/messageError');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;
  const post = await postService.create({
    title,
    content,
    categoryIds,
    email,
  });

  return res.status(CREATED).json(post);
};

const getAll = async (req, res) => {
  const posts = await postService.getAll();
  return res.status(OK).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getById(id);

  if (!post) {
    return res.status(NOT_FOUND).json(POST_NOT_EXIST);
  }

  return res.status(OK).json(post);
};

module.exports = {
  create,
  getAll,
  getById,
};
