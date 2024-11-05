const { User } = require('../models');
const generateToken = require('../utils/generateToken');
const comparePasswords = require('../utils/comparePasswords');

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            const field = existingUser.email === email ? 'email' : 'username';
            return res.status(400).json({
                success: false,
                message: `This ${field} is already registered`
            });
        }

        const user = new User({
            username,
            email,
            password,
            role: role || 3
        });

        await user.save();

        res.status(201).json({
            success: true,
            code: 201,
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const match = await comparePasswords(password, user.password);
        if(!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = await generateToken(user._id, user.username, user.email);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message
        });
    }
};

module.exports = {
    register, 
    login
};