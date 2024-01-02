const Movie = require("../models/movieModel");
const { UploadS3 } = require("../aws/S3");

const movieUpload = async (req, res) => {
  const thumbnailFile = req.files["thumbnail"]
    ? req.files["thumbnail"][0]
    : null;
  const movieFile = req.files["movie"] ? req.files["movie"][0] : null;
  const { name, description, year, genre, trailer_url } = req.body;
  const thumbnailUrl = await UploadS3(thumbnailFile);
  const movieUrl = await UploadS3(movieFile);
  const details = new Movie({
    name,
    description,
    // image: {
    //   data: file.filename,
    //   contentType: "image/png",
    // },
    image: thumbnailUrl.Location,
    year,
    genre,
    trailer_url,
    main_url: movieUrl.Location,
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
