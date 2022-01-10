const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nume: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    parola: {
        type: String,
        required: true
    }
   
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;