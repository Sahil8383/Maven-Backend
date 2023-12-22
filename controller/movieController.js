// const Movie = require("../models/Movie");
const Movie = require("../models/movieModel");

const movieUpload = async (req, res) => {
  const file = req.file;
  const { name, description, year, genre, trailer_url, main_url } = req.body;
  const details = new Movie({
    name,
    description,
    image: file.filename,
    year,
    genre,
    trailer_url,
    main_url,
  });
  await details.save();
  res.send(details);
};

const getmovie = async (req, res) => {
  res.send("get request");
};

module.exports = { movieUpload, getmovie };
