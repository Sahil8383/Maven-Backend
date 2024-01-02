const express = require("express");
const app = express();
const router = express.Router();
const {
  movieUpload,
  getAllMovies,
  getMovieById,
  getHomePageData,
  deleteMovie,
} = require("../controller/movieController");

//image storage pre process

const multer = require("multer");
const path = require("path");
app.use(express.static("public"));

// const Storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads/image"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, path.join(__dirname, "../uploads/image"));
    } else if (file.mimetype === "video/mp4" || file.mimetype === "video/mkv") {
      cb(null, path.join(__dirname, "../uploads/video"));
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    (file.fieldname === "thumbnail" &&
      (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg")) ||
    (file.fieldname === "movie" &&
      (file.mimetype === "video/mp4" || file.mimetype === "video/mkv"))
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "movie", maxCount: 1 },
]);

// routes for movies

router.route("/movie/upload").post(upload, movieUpload); //upload image and data
router.route("/movie/test").get(getAllMovies); //get all movies, wont use in frontend
router.route("/movie/:id").get(getMovieById).delete(deleteMovie); //get movie by id or delete
router.route("/movie").get(getHomePageData); //get movie id and name for home page

module.exports = router;
