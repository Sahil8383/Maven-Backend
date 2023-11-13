const express = require('express');
const multer = require('multer');
const router = express.Router();
const { SignUp, LoginIn, UploadMovies, TestUploadGridFS, getAllFiles, getSingleFile } = require('../controller/index');
const { upload  } = require('../GridFs');

// Testing Route
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Login and SingUp Routes
router.post('/signup', SignUp);
router.post('/login', LoginIn);

// Upload Movies Route
router.post('/upload', upload.single('file'), TestUploadGridFS);
router.get('/files', getAllFiles);
router.get('/files/:id', getSingleFile);

module.exports = router;