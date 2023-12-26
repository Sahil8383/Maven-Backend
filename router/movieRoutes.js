const express = require("express");
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

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

// routes for movies

router.route("/movie/upload").post(upload, movieUpload); //upload image and data
router.route("/movie/test").get(getAllMovies); //get all movies, wont use in frontend
router.route("/movie/:id").get(getMovieById).delete(deleteMovie); //get movie by id for the individual movie page or delete
router.route("/movie").get(getHomePageData); //get movie id and name for home page

module.exports = router;
