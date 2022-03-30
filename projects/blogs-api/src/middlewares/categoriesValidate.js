const Joi = require('joi');
const { BAD_REQUEST } = require('../utils/statusCode');

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

const categoriesValidate = async (req, res, next) => {
  const { error } = categoriesSchema.validate(req.body);

  if (error) {
    return res.status(BAD_REQUEST).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  categoriesValidate,
};
