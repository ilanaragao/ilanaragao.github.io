require('dotenv').config();

const jwt = require('jsonwebtoken');

const KEY = process.env.JWT_SECRET;

const verifyToken = (token) => {
  const verify = jwt.verify(token, KEY);
  return verify;
};

module.exports = {
  verifyToken,
};
