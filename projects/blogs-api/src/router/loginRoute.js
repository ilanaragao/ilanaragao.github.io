const express = require('express');

const { loginValidate } = require('../middlewares/loginValidate');

const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/', loginValidate, loginController.login);

module.exports = router;
