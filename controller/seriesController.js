const Series = require("../models/SeriesModel");
const { s3v3 } = require("../aws/S3v3");
const { s3Uploadv3 } = require("../aws/UploadS3");

const createSeries = async (req, res) => {
  const files = req.files.files;
  const Vimage = req.files.V_image[0];
  const Himage = req.files.H_image[0];
  const VimageUrl = await s3Uploadv3(Vimage);
  const HimageUrl = await s3Uploadv3(Himage);
  const result = await s3v3(files);

  const seasonsEp = [];

  for (let i = 0; i < files.length; i++) {
    const episode = {
      title: files[i].originalname,
      main_url: `${process.env.AWS_CDN_URL}${result[i].key}`,
    };
    seasonsEp.push(episode);
  }

  const series = new Series({
    name: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    vimage: `${process.env.AWS_CDN_URL}${VimageUrl.Key}`,
    himage: `${process.env.AWS_CDN_URL}${HimageUrl.Key}`,
    trailer_url: req.body.trailer_url,
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
  const result = await s3v3(files);

  const series = await Series.findById(id);
  const seasonsEp = [];
  for (let i = 0; i < files.length; i++) {
    const episode = {
      title: files[i].originalname,
      main_url: `${process.env.AWS_CDN_URL}${result[i].key}`,
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
