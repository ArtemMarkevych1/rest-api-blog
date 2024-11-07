const { signupValidator, loginValidator, verifyEmailValidator, verifyUserValidator, recoverPasswordValidator, changePasswordValidator } = require('./auth');
const { validateResult } = require('./validate');

module.exports = {
    signupValidator,
    loginValidator,
    validateResult,
    verifyEmailValidator,
    verifyUserValidator,
    recoverPasswordValidator,
    changePasswordValidator
};
