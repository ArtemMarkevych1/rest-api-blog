const { check } = require('express-validator');
const mongoose = require('mongoose');

const createCategoryValidator = [
    check('title').notEmpty().withMessage('Title is required')
];

const idValidator = [
    check('id').custom(async (value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid category id');
        }
    })
];

module.exports = {
    createCategoryValidator,
    idValidator
};