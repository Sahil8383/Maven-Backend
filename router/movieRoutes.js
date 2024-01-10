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
const { AuthMiddleware } = require("../controller");
app.use(express.static("public"));

// multer storage

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "movie", maxCount: 1 },
]);

// routes for movies

MoviesRouter.route("/upload").post(AuthMiddleware ,upload, movieUpload); //upload image and data
MoviesRouter.route("/test").get(AuthMiddleware,getAllMovies); //get all movies, wont use in frontend
MoviesRouter.route("/:id").get(AuthMiddleware,getMovieById).delete(AuthMiddleware,deleteMovie); //get movie by id or delete
MoviesRouter.route("/url/:id").get(AuthMiddleware,getMovieUrlById); //get movie url by id
MoviesRouter.route("/").get(AuthMiddleware,getHomePageData); //get movie id and name for home page

module.exports = MoviesRouter;
