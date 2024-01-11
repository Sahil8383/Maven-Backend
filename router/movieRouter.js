const express = require("express");
const app = express();
const MoviesRouter = express.Router();
const {
  movieUpload,
  getAllMovies,
  getMediaById,
  getHomePageData,
  deleteMovie,
  getMediaUrlById,
} = require("../controller/movieController");

//multer pre process

const multer = require("multer");
const { AuthMiddleware } = require("../controller/authController");
app.use(express.static("public"));

// multer storage

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "V_image", maxCount: 1 },
  { name: "H_image", maxCount: 1 },
  { name: "movie", maxCount: 1 },
]);

// routes for movies

MoviesRouter.route("/upload").post(AuthMiddleware, upload, movieUpload);
MoviesRouter.route("/test").get(AuthMiddleware, getAllMovies);
MoviesRouter.route("/:id")
  .get(AuthMiddleware, getMediaById)
  .delete(AuthMiddleware, deleteMovie);
MoviesRouter.route("/url/:id").get(AuthMiddleware, getMediaUrlById);
MoviesRouter.route("/").get(AuthMiddleware, getHomePageData);

module.exports = MoviesRouter;
