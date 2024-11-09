const Category = require('../models/Category');
const User = require('../models/User');

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            categories
        });
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            category
        });
    } catch (error) {
        next(error);
    }
};

const searchCategoryByContent = async (req, res, next) => {
    try {
        const searchQuery = req.query.q;
        
        if (!searchQuery || typeof searchQuery !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Search query is required and must be a string"
            });
        }
        
        const categories = await Category.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        
        res.status(200).json({
            success: true,
            message: categories.length > 0 ? "Categories found" : "No categories found",
            count: categories.length,
            categories
        });
    } catch (error) {
        next(error);
    }
};

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

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const { userId } = req.user;
        const updatedCategory = await Category.findByIdAndUpdate(id, { title, description, updatedBy: userId }, { new: true });
        if (!updatedCategory) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    searchCategoryByContent
};