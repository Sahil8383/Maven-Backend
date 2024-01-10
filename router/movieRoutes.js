const express = require("express");
const app = express();
const MoviesRouter = express.Router();
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
  { name: "V_image", maxCount: 1 },
  { name: "H_image", maxCount: 1 },
  { name: "movie", maxCount: 1 },
]);

// routes for movies

MoviesRouter.route("/upload").post(upload, movieUpload); //upload image and data
MoviesRouter.route("/test").get(getAllMovies); //get all movies, wont use in frontend
MoviesRouter.route("/:id").get(getMovieById).delete(deleteMovie); //get movie by id or delete
MoviesRouter.route("/url/:id").get(getMovieUrlById); //get movie url by id
MoviesRouter.route("/").get(getHomePageData); //get movie id and name for home page

module.exports = MoviesRouter;
