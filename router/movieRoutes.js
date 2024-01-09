const express = require("express");
const app = express();
const router = express.Router();
const {
  movieUpload,
  getAllMovies,
  getMovieById,
  getHomePageData,
  deleteMovie,
  getMovieUrlById,
} = require("../controller/movieController");

//multer pre process

const multer = require("multer");
app.use(express.static("public"));

// multer storage

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "movie", maxCount: 1 },
]);

// routes for movies

router.route("/movie/upload").post(upload, movieUpload); //upload image and data
router.route("/movie/test").get(getAllMovies); //get all movies, wont use in frontend
router.route("/movie/:id").get(getMovieById).delete(deleteMovie); //get movie by id or delete
router.route("/movie/url/:id").get(getMovieUrlById); //get movie url by id
router.route("/movie").get(getHomePageData); //get movie id and name for home page

module.exports = router;
