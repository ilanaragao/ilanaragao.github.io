const express = require('express');

const { tokenValidate } = require('../middlewares/tokenValidate');
const {
  postValidate,
  categoryValidate,
} = require('../middlewares/postValidate');

const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', tokenValidate, postController.getAll);
router.get('/:id', tokenValidate, postController.getById);
router.post(
  '/',
  tokenValidate,
  postValidate,
  categoryValidate,
  postController.create,
);

module.exports = router;
