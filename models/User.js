const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user',
        required: true
    },
},
{
    collection: 'reunion-task-users'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;