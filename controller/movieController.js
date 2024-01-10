const Movie = require("../models/movieModel");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const { s3Uploadv3 } = require("../aws/UploadS3");

const movieUpload = async (req, res) => {

  const role = req.role;
  if(role !== 'admin'){
    return res.status(403).json({ error: 'Forbidden' });
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

const getAllMovies = async (req, res) => {
  
  const role = req.role;
  if(role == 'user'){
    const movie = await Movie.find({});
    return res.send(movie);
  }
  const user = await User.findById(id);
  const movies = await Movie.find();
  res.send({ movies });
};

const getMovieById = async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id, { main_url: 0, vimage: 0 });
  res.send(movie);
};
const getMovieUrlById = async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id, { main_url: 1 });
  res.send(movie);
};

const getHomePageData = async (req, res) => {
  const movies = await Movie.find({}, { _id: 1, name: 1, vimage: 1 });
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
  getMovieUrlById,
};
