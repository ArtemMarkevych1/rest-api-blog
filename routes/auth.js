const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, verifyUser, forgotPassword, recoverPassword } = require('../controllers/auth');
const { signupValidator, validateResult, loginValidator, verifyEmailValidator, verifyUserValidator, recoverPasswordValidator } = require('../validators');

router.post('/register', signupValidator, validateResult, register);
router.post('/login', loginValidator, validateResult, login);
router.post('/verify-email', verifyEmailValidator, validateResult, verifyEmail);
router.post('/verify-user', verifyUserValidator, validateResult, verifyUser);
router.post('/forgot-password', verifyEmailValidator, validateResult, forgotPassword);
router.post('/recover-password', recoverPasswordValidator, validateResult, recoverPassword);

module.exports = router;
