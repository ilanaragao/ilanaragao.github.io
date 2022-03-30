require('dotenv').config();

const jwt = require('jsonwebtoken');

const KEY = process.env.JWT_SECRET;

const tokenGenerate = (user) => {
  const config = {
    algorithm: 'HS256',
    expiresIn: '24h',
  };

  const token = jwt.sign(user, KEY, config);
  return token;
};

module.exports = {
  tokenGenerate,
};
