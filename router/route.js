const express = require('express');
const multer = require('multer');
const router = express.Router();
const { SignUp, LoginIn, CreateProperty, VerifyToken, UpdateProperty , DeleteProperty ,GetAllProperties, ListUsersProperty} = require('../controller/index');

const Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const uploads = multer({
    storage: Storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb("Error: Images Only!");
        }
    }
}).single("file");


// Testing Route
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Login and SingUp Routes
router.post('/signup', SignUp);
router.post('/login', LoginIn);

module.exports = router;