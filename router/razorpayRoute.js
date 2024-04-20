const express = require("express");
const { getPayments } = require("../controller/razorpayController");
const RazorPayRouter = express.Router();


RazorPayRouter.get("/qrcode", getPayments);

module.exports = RazorPayRouter;