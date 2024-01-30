const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  episodes: [
    {
      title: {
        type: String,
        required: true,
      },
      main_url: {
        type: String,
        required: true,
      },
    },
  ],
});

const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  description: {
    type: String,
  },
  vimage: {
    type: String,
    required: true,
  },
  himage: {
    type: String,
    required: true,
  },
  trailer_url: {
    type: String,
    trim: true,
  },
  seasons: [seasonSchema],
});

const Series = mongoose.model("Series", seriesSchema);

module.exports = Series;
