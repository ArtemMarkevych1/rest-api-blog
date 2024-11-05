const { check } = require('express-validator');

const signupValidator =  [
    check('email').isEmail().withMessage('Invalid email format').trim().notEmpty().normalizeEmail(),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim().notEmpty().isStrongPassword().withMessage('Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'),
    check('username').trim().notEmpty().withMessage('Username is required'),
];

module.exports = {
    signupValidator
};