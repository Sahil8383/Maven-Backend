const express = require("express");
const multer = require("multer");
const Authrouter = express.Router();
const { SignUp, Login } = require("../controller/authController");

// Login and SingUp Routes
Authrouter.post("/signup", SignUp);
Authrouter.post("/login", Login);

module.exports = Authrouter;
