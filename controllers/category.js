const Category = require('../models/Category');
const User = require('../models/User');

const createCategory = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { userId } = req.user;
        const isCategoryExist = await Category.findOne({ title });
        if (isCategoryExist) {
            res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const newCategory = new Category({ title, description, updatedBy: userId });
        await newCategory.save();
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category: newCategory
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategory
};