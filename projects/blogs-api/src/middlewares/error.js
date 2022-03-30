const { INTERNAL_SERVER_ERROR } = require('../utils/statusCode');
const { SERVER_ERROR } = require('../utils/messageError');

const errorMiddleware = (err, _req, res, _next) => {
  const { message } = err;

  if (message) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message });
  }

  return res.status(INTERNAL_SERVER_ERROR).json(SERVER_ERROR);
};

module.exports = errorMiddleware;
