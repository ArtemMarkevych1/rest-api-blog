const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth');
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').optional().isIn([1, 2, 3])
], register);

module.exports = router;