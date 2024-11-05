const { User } = require('../models');

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create new user (password will be hashed automatically via middleware)
        const user = new User({
            username,
            email,
            password,
            role
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        });
    }
};

module.exports = {
    register
};