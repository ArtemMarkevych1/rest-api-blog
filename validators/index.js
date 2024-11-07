const { signupValidator, loginValidator, verifyEmailValidator, verifyUserValidator, recoverPasswordValidator, changePasswordValidator, updateUserValidator } = require('./auth');
const { validateResult } = require('./validate');

module.exports = {
    signupValidator,
    loginValidator,
    validateResult,
    verifyEmailValidator,
    verifyUserValidator,
    recoverPasswordValidator,
    changePasswordValidator,
    updateUserValidator
};
