const express = require("express");

const stripeRouter = express.Router();

const { createCheckoutSession } = require("../controller/stripeController");

stripeRouter.post("/create-checkout-session", createCheckoutSession);

module.exports = stripeRouter;