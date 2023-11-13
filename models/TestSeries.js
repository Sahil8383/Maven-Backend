const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    movieId: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
});

const Series = mongoose.model('Series', MovieSchema);

module.exports = Series;