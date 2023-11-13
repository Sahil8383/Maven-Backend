const User = require('../models/User');
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const { UploadS3 } = require("../S3");
const mongoose = require('mongoose');
const Grid = require("gridfs-stream");
const dotenv = require('dotenv');
dotenv.config();

const conn = mongoose.createConnection(process.env.MONGO_URL);
let gfs, gridfsbucket;

conn.once("open", () => {


    gridfsbucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "test-movies"
    });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("test-movies");
});

const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bycrypt.genSalt();
        const passwordHash = await bycrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: passwordHash,
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const LoginIn = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bycrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_KEY);
        delete user.password;
        res.setHeader('authorization', token);
        res.setHeader('userid', user._id);
        res.status(200).json({ token, user, userId: user._id });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
}


const UploadMovies = async (req, res) => {
    try {

        const { title, bio, genre } = req.body;
        const video = req.file;

        const result = await UploadS3(video);

        const newMovie = new Movie({
            title,
            bio,
            genre,
            video: result.Location,
        });

        const movie = await newMovie.save();

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const TestUploadGridFS = async (req, res) => {

    res.status(200).json({ file: req.file, body: req.body });
}


const getAllFiles = (req, res) => {

    gfs.files.find().toArray((err, files) => {

        if (!files || files.length === 0) {
            return res.status(404).json({ err });
        }

        return res.json(files);
    });
};


const getSingleFile = (req, res) => {

    const { id } = req.params;

    gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({ err });
        }
        const readStream = gridfsbucket.openDownloadStream(file._id);
        readStream.pipe(res);
    });

}


module.exports = {
    SignUp,
    LoginIn,
    UploadMovies,
    TestUploadGridFS,
    getAllFiles,
    getSingleFile,
}