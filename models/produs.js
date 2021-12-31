const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema;

const produsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    cantitate: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Produs = mongoose.model('Produs', produsSchema);
module.exports = Produs;