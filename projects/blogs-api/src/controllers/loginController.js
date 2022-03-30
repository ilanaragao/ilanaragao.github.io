const loginService = require('../services/loginService');

const { tokenGenerate } = require('../middlewares/auth');
const { BAD_REQUEST, OK } = require('../utils/statusCode');
const { INVALID_FIELDS } = require('../utils/messageError');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginService.findByEmail({ email });

  if (!user || user === null) {
    return res.status(BAD_REQUEST).json(INVALID_FIELDS);
  }

  const token = tokenGenerate({ email, password });
  return res.status(OK).json({ token });
};

module.exports = {
  login,
};
