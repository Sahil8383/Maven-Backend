const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const Grid = require("gridfs-stream");
const dotenv = require('dotenv');
dotenv.config();

const conn = mongoose.createConnection(process.env.MONGO_URL);
let gfs , gfsSeries;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("test-movies");
    gfsSeries = Grid(conn.db, mongoose.mongo);
    gfsSeries.collection("test-series");
});

const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }

                const { genre, title, description } = req.body;
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    metadata: {
                        genre: genre,
                        title: title,
                        description: description
                    },
                    bucketName: 'test-movies'
                };
                resolve(fileInfo);

            });
        });
    }
});

const storageSeries = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }

                const { genre, title, description } = req.body;
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    metadata: {
                        genre: genre,
                        title: title,
                        description: description
                    },
                    bucketName: 'test-series'
                };
                resolve(fileInfo);

            });
        });
    }
});


const upload = multer({ storage });
const uploadSeries = multer({ storage: storageSeries });

module.exports = { upload, gfs , uploadSeries, gfsSeries }