const mongoose = require("mongoose");

const movie_schema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "must provide name"],
    trim: true,
  },
  description: {
    type: String,
    // required: [true, "must provide description"],
    trim: true,
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
    type: Number,
    // required: [true, "must provide year"],
    trim: true,
  },
  genre: {
    type: String,
    // required: [true, "must provide genre"],
    trim: true,
  },
  trailer_url: {
    type: String,
    // required: [true, "must provide trailer_url"],
    trim: true,
  },
  main_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movie_schema);
