const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, verifyUser, forgotPassword, recoverPassword, changePassword } = require('../controllers/auth');
const { signupValidator, validateResult, loginValidator, verifyEmailValidator, verifyUserValidator, recoverPasswordValidator, changePasswordValidator } = require('../validators');
const isAuth = require('../middlewares/isAuth');
router.post('/register', signupValidator, validateResult, register);
router.post('/login', loginValidator, validateResult, login);
router.post('/verify-email', verifyEmailValidator, validateResult, verifyEmail);
router.post('/verify-user', verifyUserValidator, validateResult, verifyUser);
router.post('/forgot-password', verifyEmailValidator, validateResult, forgotPassword);
router.post('/recover-password', recoverPasswordValidator, validateResult, recoverPassword);
router.put('/change-password', isAuth, changePasswordValidator, validateResult, changePassword);

module.exports = router;
