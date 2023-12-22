const express = require("express");
const router = express.Router();
const movieRoutes = require("../controller/movie");
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

router.post("/movieUpload", upload.single("file"), movieRoutes);

module.exports = router;
