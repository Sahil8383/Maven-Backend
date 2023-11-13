const mongoose = require('mongoose');


const TestMovieSchema = new mongoose.Schema({
    video:{
        fileId: mongoose.Schema.Types.ObjectId,
        fileName: String,
    },
},{
    collection: 'test-movies'
});

const TestMovie = mongoose.model('TestMovie', TestMovieSchema);

module.exports = TestMovie;