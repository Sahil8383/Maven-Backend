const mongoose = require('mongoose');

const SubscribedSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    year:{
        type: Date,
        default: Date.now,
    },
    genre:{
        type: String,
        default: 'Porn'
    },
    url:{
        type: String,
        required: true
    },
});

const Subscribed = mongoose.model('Subscribed', SubscribedSchema);

module.exports = Subscribed;