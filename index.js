const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./DB.js");
const dotenv = require("dotenv");
// const router = require("./router/route");
const router = require("./router/movieRoutes");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
connectDB();

app.use("/api", router);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
