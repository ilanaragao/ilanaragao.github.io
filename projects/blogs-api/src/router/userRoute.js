const express = require('express');

const { userValidate } = require('../middlewares/userValidate');
const { tokenValidate } = require('../middlewares/tokenValidate');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', tokenValidate, userController.getAll);
router.get('/:id', tokenValidate, userController.getById);
router.post('/', userValidate, userController.create);

module.exports = router;
