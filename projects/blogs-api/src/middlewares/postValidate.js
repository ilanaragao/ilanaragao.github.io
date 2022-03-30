const Joi = require('joi');

const { Category } = require('../models');
const { BAD_REQUEST } = require('../utils/statusCode');

const { CATEGORY_IDS_NOT_FOUND } = require('../utils/messageError');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
});

const postValidate = async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(BAD_REQUEST).json({ message: error.details[0].message });
  }

  next();
};

const categoryValidate = async (req, res, next) => {
  const { categoryIds } = req.body;
  const findCategory = await Promise.all(
    categoryIds.map(async (category) =>
      Category.findOne({ where: { id: category } })),
  );

  if (findCategory.some((category) => !category)) {
    return res.status(BAD_REQUEST).json(CATEGORY_IDS_NOT_FOUND);
  }

  next();
};

module.exports = {
  postValidate,
  categoryValidate,
};
