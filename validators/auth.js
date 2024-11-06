const { check } = require('express-validator');

const signupValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
];

const loginValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
];

const verifyEmailValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
];

const verifyUserValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    check('code')
        .trim()
        .notEmpty().withMessage('Code is required')
];

const recoverPasswordValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    check('code')
        .trim()
        .notEmpty().withMessage('Code is required'),
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
];

module.exports = {
    signupValidator,
    loginValidator,
    verifyEmailValidator,
    verifyUserValidator,
    recoverPasswordValidator
};