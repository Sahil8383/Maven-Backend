const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./db/connection.js");
const dotenv = require("dotenv");
// const router = require("./router/route");
const router = require("./router/movieRoutes");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", router);

const start = async () => {
  const port = process.env.PORT || 4000;
  await connectDB();
  app.listen(port, () => {
    console.log("Server is running on port: " + port);
  });
};

start();
