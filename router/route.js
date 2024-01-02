const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  SignUp,
  LoginIn,
  TestUploadGridFS,
  getAllFiles,
  getSingleFile,
  UploadArrayOfMovies,
  getSingleSeries,
  getAllSeries,
} = require("../controller/index");
const { upload, uploadSeries } = require("../GridFs");

// Testing Route
router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Login and SingUp Routes
router.post("/signup", SignUp);
router.post("/login", LoginIn);

//movies Route

// Upload Movies Route
router.post("/upload", upload.single("file"), TestUploadGridFS);
router.get("/files", getAllFiles);
router.get("/files/:id", getSingleFile);

// Upload Array of Movies Route
router.post("/uploadArray", uploadSeries.array("files"), UploadArrayOfMovies);
router.get("/series/:id", getSingleSeries);
router.get("/allSeries", getAllSeries);

module.exports = router;
