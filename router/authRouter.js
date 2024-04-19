const express = require("express");
const multer = require("multer");
const Authrouter = express.Router();
const { SignUp, Login, ClerkSignUp } = require("../controller/authController");

// Login and SingUp Routes
Authrouter.post("/signup", SignUp);
Authrouter.post("/login", Login);
Authrouter.post("/clerk",ClerkSignUp);

console.log("Github congif test");

module.exports = Authrouter;
