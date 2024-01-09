const express = require("express");
const app = express();
const router = express.Router();
const {
    createSeries,
} = require("../controller/Series.controller");
//multer pre process

const multer = require("multer");
app.use(express.static("public"));

// multer storage

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "files", maxCount: 5 },
]);

router.route("/series/upload").post(upload,createSeries); //upload image and data

module.exports = router;
