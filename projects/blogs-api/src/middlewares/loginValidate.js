const Joi = require('joi');

const { BAD_REQUEST } = require('../utils/statusCode');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidate = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(BAD_REQUEST).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  loginValidate,
};
