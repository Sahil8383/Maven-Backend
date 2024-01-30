const express = require("express");
const app = express();
const SeriesRouter = express.Router();
const {
  createSeries,
  addSeries,
  getAllSeries,
} = require("../controller/seriesController");
//multer pre process

const multer = require("multer");
const { AuthMiddleware } = require("../controller/authController");
app.use(express.static("public"));

// multer storage

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "V_image", maxCount: 1 },
  { name: "H_image", maxCount: 1 },
  { name: "files", maxCount: 5 },
]);

SeriesRouter.route("/upload").post(upload, createSeries);
SeriesRouter.route("/:id").patch(upload, addSeries);
SeriesRouter.route("/").get(getAllSeries);

module.exports = SeriesRouter;
