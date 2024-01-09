const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  episodes: [{
    title: {
      type: String,
      required: true
    },
    videoLink: {
      type: String,
      required: true
    }
  }]
});

const seriesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  genre: {
    type: String,
  },
  description: {
    type: String,
  },
  seasons: [seasonSchema]
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
