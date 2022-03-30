const { TOKEN_NOT_FOUND, INVALID_TOKEN } = require('../utils/messageError');
const { UNAUTHORIZED } = require('../utils/statusCode');
const { verifyToken } = require('./token/verifyToken');

const tokenValidate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json(TOKEN_NOT_FOUND);
  }

  try {
    verifyToken(authorization);
    req.user = verifyToken(authorization);
  } catch (error) {
    return res.status(UNAUTHORIZED).json(INVALID_TOKEN);
  }

  next();
};

module.exports = {
  tokenValidate,
};
