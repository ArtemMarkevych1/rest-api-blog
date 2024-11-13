const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const mimeType = file.mimetype;
    // allow images, pdf, doc, docx, xls, xlsx, ppt, pptx
    if (!mimeType.startsWith('image/')
        && !mimeType.startsWith('application/pdf')
        && !mimeType.startsWith('application/msword')
        && !mimeType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        && !mimeType.startsWith('application/vnd.ms-excel')
        && !mimeType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        && !mimeType.startsWith('application/vnd.ms-powerpoint')
        && !mimeType.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
        req.fileValidationError = 'Only image, pdf, doc, docx, xls, xlsx, ppt, pptx files are allowed!';
        return cb(new Error('Only image, pdf, doc, docx, xls, xlsx, ppt, pptx files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    }
});

const deleteFile = async (req, res, next) => {
    const { key } = req.params;
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const file = bucket.file(key);
    await file.delete();
    next();
}

module.exports = { upload, deleteFile };