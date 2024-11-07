const { check } = require('express-validator');

const createCategoryValidator = [
    check('title').notEmpty().withMessage('Title is required')
];

module.exports = {
    createCategoryValidator
};