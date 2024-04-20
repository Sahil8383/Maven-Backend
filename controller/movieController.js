const Movie = require("../models/movieModel");
const Series = require("../models/SeriesModel");
const Subscribed = require("../models/subModel");
const { s3Uploadv3 } = require("../aws/UploadS3");

const movieUpload = async (req, res) => {
  const role = req.role;
  if (role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { name, description, year, genre, trailer_url } = req.body;
  files = req.files;
  const Vimage = files.V_image[0];
  const Himage = files.H_image[0];
  const movieFile = files.movie[0];
  const VimageUrl = await s3Uploadv3(Vimage);
  const HimageUrl = await s3Uploadv3(Himage);
  const movieUrl = await s3Uploadv3(movieFile);
  const cdn = process.env.AWS_CDN_URL;
  const details = new Movie({
    name,
    description,
    vimage: `${cdn}${VimageUrl.Key}`,
    himage: `${cdn}${HimageUrl.Key}`,
    year,
    genre,
    trailer_url,
    main_url: `${cdn}${movieUrl.Key}`,
  });
  await details.save();
  res.send(files);
};

const getHomePageData = async (req, res) => {
  const role = req.role;
  if (role == "user") {
    const movie = await Movie.find({}, { _id: 1, name: 1, vimage: 1 });
    const series = await Series.find({}, { _id: 1, name: 1, vimage: 1 });
    return res.send({ movie, series, role });
  }
  const movie = await Movie.find({}, { _id: 1, name: 1, vimage: 1 });
  const subMovie = await Subscribed.find({}, { _id: 1, name: 1, vimage: 1 });
  const series = await Series.find({}, { _id: 1, name: 1, vimage: 1 });

  res.send({ movie, subMovie, series, role });
};

const getAllMovies = async (req, res) => {
  const role = req.role;
  if (role == "user") {
    const movie = await Movie.find({});
    return res.send({ movie });
  }
  const movie = await Movie.find();
  const sub = await Subscribed.find();
  res.send({ movie, sub });
};

const getMediaById = async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id, { main_url: 0, vimage: 0 });
  const series = await Series.findById(id, { main_url: 0, vimage: 0 });
  const Sub = await Subscribed.findById(id, { vimage: 0 });
  if (movie) {
    return res.send({ media: movie });
  }
  if (series) {
    return res.send({ media: series });
  }

  res.send({ media: Sub });
};

const getMediaUrlById = async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id, { main_url: 1 });
  const sub = await Subscribed.findById(id, { main_url: 1 });
  // const series = await Series.findById(id, { main_url: 1 });
  if (movie) {
    return res.send({ media: movie });
  }
  // if (series) {
  //   return res.send({ media: series });
  // }

  res.send({ media: sub });
};

const deleteMovie = async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findByIdAndDelete(id);
  res.send(movie);
};

module.exports = {
  movieUpload,
  getAllMovies,
  getMediaById,
  getHomePageData,
  deleteMovie,
  getMediaUrlById,
};
