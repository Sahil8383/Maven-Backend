const express = require("express");
const router = express.Router();
const { movieUpload } = require("../controller/movieController");

//image storaeg pre process

const multer = require("multer");

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

// routes for movies

router.post("/movie", upload.single("file"), movieUpload);

module.exports = router;
