const Series = require("../models/SeriesModel");
const { s3Uploadv2 } = require("../aws/SeriesUpload");

const createSeries = async (req, res) => {
  const files = req.files.files;
  const result = await s3Uploadv2(files);

  const seasonsEp = [];

  for (let i = 0; i < files.length; i++) {
    const episode = {
      title: files[i].originalname,
      videoLink: `${process.env.AWS_CDN_URL}${result[i].Key}`,
    };
    seasonsEp.push(episode);
  }
  console.log(seasonsEp);

  const series = new Series({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    seasons: [
      {
        title: req.body.seasonTitle,
        episodes: seasonsEp,
      },
    ],
  });

  await series.save();

  res.send(series);
};

const getAllSeries = async (req, res) => {
  const series = await Series.find();
  res.send(series);
};

const addSeries = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const files = req.files.files;
  const result = await s3Uploadv2(files);

  const series = await Series.findById(id);
  const seasonsEp = [];
  for (let i = 0; i < files.length; i++) {
    const episode = {
      title: files[i].originalname,
      videoLink: `${process.env.AWS_CDN_URL}${result[i].Key}`,
    };
    seasonsEp.push(episode);
  }

  series.seasons.push({
    title,
    episodes: seasonsEp,
  });

  await series.save();

  res.send(series);
};

module.exports = {
  createSeries,
  addSeries,
  getAllSeries,
};
