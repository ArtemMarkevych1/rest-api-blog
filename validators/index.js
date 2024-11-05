const { signupValidator, loginValidator } = require('./auth');
const { validateResult } = require('./validate');

module.exports = {
    signupValidator,
    loginValidator,
    validateResult
};
