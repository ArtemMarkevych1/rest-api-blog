const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth');
const { login } = require('../controllers/auth');
const { signupValidator, validateResult, loginValidator } = require('../validators');

router.post('/register', signupValidator, validateResult, register);
router.post('/login', loginValidator, validateResult, login);

module.exports = router;