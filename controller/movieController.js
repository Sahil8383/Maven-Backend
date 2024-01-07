const Movie = require("../models/movieModel");
const { s3Uploadv3 } = require("../aws/UploadS3");

const movieUpload = async (req, res) => {
  const { name, description, year, genre, trailer_url } = req.body;
  files = req.files;
  const thumbnailFile = files.thumbnail[0];
  const movieFile = files.movie[0];
  const thumbnailUrl = await s3Uploadv3(thumbnailFile);
  const movieUrl = await s3Uploadv3(movieFile);
  console.log("urlt", thumbnailUrl);
  console.log("urlm", movieUrl);
  const details = new Movie({
    name,
    description,
    // image: {
    //   data: file.filename,
    //   contentType: "image/png",
    // },
    image: thumbnailUrl.Key,
    year,
    genre,
    trailer_url,
    main_url: movieUrl.Key,
  });
  await details.save();
  res.send(details);
};

const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.send({ movies });
};

const getMovieById = async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
};

const getHomePageData = async (req, res) => {
  const movies = await Movie.find({}, { _id: 1, name: 1, image: 1 });
  res.send({ movies });
};

const deleteMovie = async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findByIdAndDelete(id);
  res.send(movie);
};

module.exports = {
  movieUpload,
  getAllMovies,
  getMovieById,
  getHomePageData,
  deleteMovie,
};
