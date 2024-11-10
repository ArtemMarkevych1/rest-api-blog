const express = require('express');
const router = express.Router();
const { uploadFile, deleteFile } = require('../controllers/file');
const { isAuth, isAdmin } = require('../middlewares');
const upload = require('../middlewares/upload');

router.post('/upload', isAuth, upload.single('image'), uploadFile);
router.delete('/:id', isAuth, isAdmin, deleteFile);

module.exports = router;