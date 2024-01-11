const Subscribed = require("../models/subModel");
const dotenv = require("dotenv");
dotenv.config();
const { s3Uploadv3 } = require("../aws/UploadS3");

const createSubscribed = async (req, res) => {
  const { name } = req.body;
  files = req.files;
  const H_image = files.H_image[0];
  const movieFile = files.movie[0];
  const H_imageUrl = await s3Uploadv3(H_image);
  const movieUrl = await s3Uploadv3(movieFile);
  const cdn = process.env.AWS_CDN_URL;
  const details = new Subscribed({
    name,
    himage: `${cdn}${H_imageUrl.Key}`,
    vimage: `${cdn}${H_imageUrl.Key}`,
    main_url: `${cdn}${movieUrl.Key}`,
  });
  await details.save();
  res.send(details);
};

module.exports = {
  createSubscribed,
};
