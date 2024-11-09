const express = require('express');
const router = express.Router();
const { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById, searchCategoryByContent } = require('../controllers/category');
const { createCategoryValidator, idValidator } = require('../validators/category');
const { validateResult } = require('../validators/validate');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/get-all-categories', isAuth, getAllCategories);
router.get('/get-category/:id', isAuth, idValidator, validateResult, getCategoryById);
router.post('/add-category', isAuth, isAdmin, createCategoryValidator, validateResult, createCategory);
router.put('/update-category/:id', isAuth, isAdmin, idValidator, validateResult, updateCategory);
router.delete('/:id', isAuth, isAdmin, validateResult, deleteCategory);
router.get('/search', isAuth, searchCategoryByContent);
module.exports = router;