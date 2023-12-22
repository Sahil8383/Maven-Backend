const Movie = require("../models/Movie");
const { UploadS3 } = require("../S3");

const movieUpload = async (req, res) => {
  const file = req.file;
  //   res.send(file);
  //   console.log(file);
  const result = await UploadS3(file);
  const movie = new Movie({
    Image: result.Location,
  });
  await movie.save();
  res.send(movie);
};

module.exports = movieUpload;
