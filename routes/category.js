const express = require('express');
const router = express.Router();
const { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById } = require('../controllers/category');
const { createCategoryValidator, idValidator } = require('../validators/category');
const { validateResult } = require('../validators/validate');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/categories', isAuth, getAllCategories);
router.get('/:id', isAuth, idValidator, validateResult, getCategoryById);
router.post('/', isAuth, isAdmin, createCategoryValidator, validateResult, createCategory);
router.put('/:id', isAuth, isAdmin, idValidator, validateResult, updateCategory);
router.delete('/:id', isAuth, isAdmin, idValidator, validateResult, deleteCategory);

module.exports = router;