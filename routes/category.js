const express = require('express');
const router = express.Router();
const { createCategory } = require('../controllers/category');
const { createCategoryValidator } = require('../validators/category');
const { validateResult } = require('../validators/validate');
const isAuth = require('../middlewares/isAuth');

router.post('/', isAuth, createCategoryValidator, validateResult, createCategory);

module.exports = router;