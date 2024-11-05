const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth');
const { signupValidator } = require('../validators');

router.post('/register', signupValidator, register);

module.exports = router;