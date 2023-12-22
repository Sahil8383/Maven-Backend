const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    // title: {
    //     type: String,
    //     required: true,
    // },
    // bio: {
    //     type: String,
    //     required: true,
    // },
    // genre: {
    //     type: String,
    //     required: true,
    // },
    // video: {
    //     type: String,
    //     required: true,
    // },

    Image: {
      type: String,
      required: true,
    },
  },
  {
    collection: "maven-movies",
  }
);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
