const mongoose = require("mongoose");

const SubscribedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vimage: {
    type: String,
    required: true,
  },
  himage: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    default: new Date().getFullYear(),
  },
  genre: {
    type: String,
    default: "Porn",
  },
  main_url: {
    type: String,
    required: true,
  },
});

const Subscribed = mongoose.model("Premium", SubscribedSchema);

module.exports = Subscribed;
