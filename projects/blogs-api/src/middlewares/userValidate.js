const Joi = require('joi');

const { PASSWORD_LENGTH } = require('../utils/messageError');
const { BAD_REQUEST } = require('../utils/statusCode');

const EIGHT = 8;
const SIX = 6;

const userSchema = Joi.object({
  displayName: Joi.string().min(EIGHT),
  password: Joi.string().min(SIX).message(PASSWORD_LENGTH).required(),
  email: Joi.string().email().required(),
  image: Joi.string(),
});

const userValidate = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(BAD_REQUEST).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  userValidate,
};
