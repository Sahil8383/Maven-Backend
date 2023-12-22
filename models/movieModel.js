const mongoose = require("mongoose");

const movie_schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "must provide description"],
    trim: true,
  },
  image: {
    type: String,
  },
  year: {
    type: Number,
    required: [true, "must provide year"],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, "must provide genre"],
    trim: true,
  },
  trailer_url: {
    type: String,
    required: [true, "must provide trailer_url"],
    trim: true,
  },
  main_url: {
    type: String,
    required: [true, "must provide main_url"],
    trim: true,
  },
});

module.exports = mongoose.model("Movie", movie_schema);
