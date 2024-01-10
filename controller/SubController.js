const Subscribed = require('../models/Subscribed');
const dotenv = require('dotenv');
dotenv.config();
const { s3Uploadv3 } = require("../aws/UploadS3");

const createSubscribed = async (req, res) => {
    const { name } = req.body;
    files = req.files;
    const thumbnailFile = files.thumbnail[0];
    const movieFile = files.movie[0];
    const thumbnailUrl = await s3Uploadv3(thumbnailFile);
    const movieUrl = await s3Uploadv3(movieFile);
    const cdn = process.env.AWS_CDN_URL;
    const details = new Subscribed({
        name,
        thumbnail: `${cdn}${thumbnailUrl.Key}`,
        url: `${cdn}${movieUrl.Key}`,
    });
    await details.save();
    res.send(details);
}

module.exports = {
    createSubscribed,
}