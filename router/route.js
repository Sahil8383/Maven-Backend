const express = require("express");
const multer = require("multer");
const Authrouter = express.Router();
const {
  SignUp,
  LoginIn,
} = require("../controller/index");

// Testing Route
Authrouter.get("/", (req, res) => {
  res.send("Hello World!");
});

// Login and SingUp Routes
Authrouter.post("/signup", SignUp);
Authrouter.post("/login", LoginIn);

module.exports = Authrouter;
