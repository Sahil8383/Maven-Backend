const express = require("express");
const multer = require("multer");
const { createSubscribed } = require("../controller/SubController");
const SubRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "H_image", maxCount: 1 },
  { name: "movie", maxCount: 1 },
]);

// Login and SingUp Routes
SubRouter.post("/upload", upload, createSubscribed);
// SubRouter.post("/login", LoginIn);

module.exports = SubRouter;
