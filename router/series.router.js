const express = require("express");
const app = express();
const SeriesRouter = express.Router();
const {
    createSeries, addSeries, getAllSeries,
} = require("../controller/Series.controller");
//multer pre process

const multer = require("multer");
const { AuthMiddleware } = require("../controller");
app.use(express.static("public"));

// multer storage

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "files", maxCount: 5 },
]);

SeriesRouter.route("/upload").post(AuthMiddleware,upload,createSeries);
SeriesRouter.route("/:id").patch(AuthMiddleware,upload, addSeries); 
SeriesRouter.route("/").get(AuthMiddleware,getAllSeries);

module.exports = SeriesRouter;
