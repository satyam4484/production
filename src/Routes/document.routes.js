const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const documentController = require('../Controllers/document.controller');

// Configure multer storage and file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/documents/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage });

// for single document
// router.route('/upload').post(upload.single('document'), documentController.uploadDocument);

// for multiple document with manually fieldname
// router.route('/upload').post(upload.fields([
//     { name: 'aad', maxCount: 1 },
//     { name: 'pan', maxCount: 1 }
// ]), documentController.uploadDocument);

// for multiple document
router.route('/upload').post(upload.any(), documentController.uploadDocument);

module.exports = router;