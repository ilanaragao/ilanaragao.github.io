const express = require('express');

const { categoriesValidate } = require('../middlewares/categoriesValidate');
const { tokenValidate } = require('../middlewares/tokenValidate');

const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.get('/', tokenValidate, categoriesController.getAll);
router.post(
  '/',
  categoriesValidate,
  tokenValidate,
  categoriesController.create,
);

module.exports = router;
