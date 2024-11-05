const jwt = require('jsonwebtoken');

const generateToken = (userId, userName, userEmail) => {
    return jwt.sign(
        { userId, name: userName, email: userEmail },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN } 
    );
};

module.exports = generateToken; 