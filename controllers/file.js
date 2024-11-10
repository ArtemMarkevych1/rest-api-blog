const User = require('../models/User');
const { Storage } = require('@google-cloud/storage');

const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: req.file
        });
    } catch (error) {
        next(error);
    }
};

const deleteFile = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Add your file deletion logic here

        res.status(200).json({
            success: true,
            message: "File deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadFile,
    deleteFile
};